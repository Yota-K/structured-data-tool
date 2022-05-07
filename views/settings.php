<?php
$post_types = StructuredDataTool::get_table_data();

// バックエンドに送信する情報をまとめた連想配列を生成する処理
function generate_submit_values($values, $post_types)
{
  // バックエンドに送信するデフォルト値を設定した連想配列を生成
  $default_values = [];

  foreach ($post_types as $arr) {
    $default_values[] = [
      'post_type' => $arr['post_type'],
      'value' => StructuredDataTool::NOT_CHECKED_VALUE,
    ];
  }

  $submit_values = null;

  // 全ての項目にチェックがつけられなかった時の処理
  if (is_null($values)) {
    $submit_values = $default_values;
  } else {
    $update_values = [];

    // 入力された値からバックエンドに送るための連想配列を生成
    foreach ($values as $arr) {
      $split_value = explode(',', $arr);
      $post_type = $split_value[0];
      $new_value = $split_value[1];

      $update_values[] = [
        'post_type' => $post_type,
        'value' => $new_value,
      ];
    };

    // 連想配列の中から重複した値を削除する
    // 参考: https://qiita.com/YusukeHigaki/items/dbcb726592aa2fa2ff42
    $tmp = [];
    foreach (array_merge($update_values, $default_values) as $arr){
      if (!in_array($arr['post_type'], $tmp)) {
        $tmp[] = $arr['post_type'];
        $submit_values[] = $arr;
      }
    }
  }

  return $submit_values;
}

// 保存処理
function save_setting($post_types)
{
  global $wpdb;

  $wpdb->show_errors();

  // バックエンドに送信する情報をまとめた連想配列
  $submit_values = generate_submit_values($_POST['values'], $post_types);
  StructuredDataTool::save_settings($wpdb, $submit_values);

  if (!empty($wpdb->last_error)) {
    echo '<p style="color: red; font-weight: bold;">保存処理に失敗しました！</p>';
  }
}

// 投稿タイプの新規追加
function add_new_post_type() 
{
  global $wpdb;

  $wpdb->show_errors();
  StructuredDataTool::add_new_post_type_info($wpdb);

  if (!empty($wpdb->last_error)) {
    echo '<p style="color: red; font-weight: bold;">投稿タイプの追加に失敗しました！</p>';
  }
}

// 投稿タイプの削除
function remove_post_type() 
{
  global $wpdb;

  $wpdb->show_errors();
  StructuredDataTool::remove_post_type_info($wpdb);

  if (!empty($wpdb->last_error)) {
    echo '<p style="color: red; font-weight: bold;">投稿タイプの削除に失敗しました！</p>';
  }
}


if (isset($_POST['save_setting'])) {
  save_setting($post_types);
} else if (isset($_POST['add_new_post_type'])) {
  add_new_post_type();
} else if (isset($_POST['remove_post_type'])) {
  remove_post_type();
}
?>

<h2>設定</h2>
<h3>投稿タイプの選択</h3>
<p>構造化データを設定したい投稿タイプを選択して下さい。</p>
<form method="POST">
  <?php
  if ($post_types):
  foreach ($post_types as $arr):
  ?>
    <div>
      <input
        class="post-type-checkbox"
        type="checkbox"
        id="<?= $arr['post_type']; ?>"
        name="values[]"
        value="<?= $arr['post_type'] . ',' . $arr['value']; ?>"
        <?= $arr['value'] === StructuredDataTool::CHECKED_VALUE ? 'checked' : ''; ?>
      >
      <label for="<?= $arr['post_name']; ?>">
        <?= $arr['post_name']; ?>
      </label>
    </div>
  <?php
  endforeach;
  else:
  ?>
    <p style="color: red; font-weight: bold;">投稿タイプの取得に失敗しました！</p>
  <?php endif; ?>
  <div style="margin-top: 15px;">
    <input
      class="button button-primary button-large"
      type="submit"
      name="save_setting"
      value="設定を保存する"
    />
  </div>
  <h3>投稿タイプの追加</h3>
  <p>プラグインインストール後に投稿タイプを追加した際は、こちらのボタンをクリックして投稿タイプの登録を行ってください。</p>
  <input
    class="button button-primary button-large"
    type="submit"
    name="add_new_post_type"
    value="投稿タイプを追加する"
  />
  <h3>投稿タイプの削除</h3>
  <p>プラグインインストール後に投稿タイプを削除した際は、こちらのボタンをクリックして投稿タイプの削除を行ってください。</p>
  <input
    class="button button-primary button-large"
    type="submit"
    name="remove_post_type"
    value="投稿タイプを削除する"
  />
</form>

<script>
// チェックしたタイミングでcheckboxのvalueを書き換える処理
const targets = document.querySelectorAll(`input[type='checkbox'][name='values[]']`);

for (let target of targets) {
  target.addEventListener('change', () => {
    const splitValue = target.value.split(',');
    target.value = splitValue[1] === '0' ? `${splitValue[0]},1` : `${splitValue[0]},0`;
  });
}
</script>
