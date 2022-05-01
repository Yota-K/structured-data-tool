<?php
// チェックをつけた投稿タイプのみ構造化データを設定するフィルドを表示する
function create_custom_fields()
{
  $post_types = StructuredDataTool::get_table_data();

  if (count($post_types) === 0) return;

  foreach ($post_types as $arr) {
    $post_type = $arr['post_type'];
    $value =  $arr['value'];

    if ($value === StructuredDataTool::CHECKED_VALUE) {
      add_meta_box(
        'sample_setting', //編集画面セクションID
        '構造化データ', //編集画面セクションのタイトル
        'insert_custom_fields', //編集画面セクションにHTML出力する関数
        $post_type, // 投稿タイプ名
        'normal' //編集画面セクションが表示される部分
      );
    }
  }
}
add_action('admin_menu', 'create_custom_fields');

// 記事編集画面に表示するカスタムフィールド
function insert_custom_fields()
{
  global $post;

  $sample = get_post_meta($post->ID, get_post_type($post->ID), true); ?>

<form method="post" action="admin.php?page=site_settings">
  <label for="sample" style="display: block;">構造化データを入力してください</label>
  <textarea id="sample" name="sample" cols="60" rows="10"><?= $sample ?></textarea>
</form>

<?php
}

function save_custom_fields($post_id)
{
  if (isset($_POST['sample'])) {
    update_post_meta($post_id, 'sample', $_POST['sample']);
  }
}
add_action('save_post', 'save_custom_fields');
