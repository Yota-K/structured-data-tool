<?php
$structuredDataTool = new StructuredDataTool();
$post_types = $structuredDataTool->get_table_data();

// バックエンドに送信する情報をまとめた連想配列を生成する処理
function generate_submit_values($values, $post_types) 
{
  // バックエンドに送信するデフォルト値を設定した連想配列を生成
  $default_values = [];

  foreach ($post_types as $arr) {
    $post_type = $arr['post_type'];
    $default_values[] = [
      'post_type' => $arr['post_type'],
      'value' => '0',
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
  $values = $_POST['values'];

  if ($_SERVER["REQUEST_METHOD"] !== 'POST' && !isset($_POST['save_setting']) && !isset($values)) return;

  // バックエンドに送信する情報をまとめた連想配列
  $submit_values = generate_submit_values($values, $post_types);

  global $wpdb;
  $wpdb->show_errors();

  $table_name = $wpdb->prefix . StructuredDataTool::TABLE_NAME;
  $query = "UPDATE $table_name SET value = %s WHERE post_type = %s";

  foreach ($submit_values as $arr) {
    $update_value = $arr['value'] === '0' ? '0' : '1';
    $wpdb->query($wpdb->prepare($query, $update_value, $arr['post_type']));
  }

  if (empty($wpdb->last_error)) {
    echo '<script>location.reload();</script>';
  } else {
    echo '<p style="color: red; font-weight: bold;">データの更新に失敗しました！</p>';
  }
}

save_setting($post_types);
?>

<h2>設定</h2>
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
      value="登録"
    />
  </div>
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
