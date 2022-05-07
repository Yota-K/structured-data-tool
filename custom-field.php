<?php
// wp_postmetaテーブルに格納するmeta_keyを生成する
function meta_key($post_id)
{
  $post_type = get_post_type($post_id);
  return sprintf("$post_type%s", '_structured_data');
}

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

  $meta_value = get_post_meta($post->ID, meta_key($post->ID), true);

  echo <<<EOM
<form method="POST" action="admin.php?page=site_settings">
  <label for="structured_data" style="display: block;">構造化データを入力してください</label>
  <textarea id="structured_data" name="structured_data" cols="60" rows="10">$meta_value</textarea>
</form>
EOM;
}

// カスタムフィールドの保存処理
function save_custom_fields($post_id)
{
  if (isset($_POST['structured_data'])) {
    update_post_meta($post_id, meta_key($post_id), $_POST['structured_data']);
  }
}
add_action('save_post', 'save_custom_fields');

// 構造化データをフッターに出力する
function insert_structured_data()
{
  global $post, $wpdb;

  // 表示されている投稿タイプがチェック済みかどうかを取得
  $post_type = get_post_type($post->ID);
  $table_name = $wpdb->prefix . StructuredDataTool::TABLE_NAME;
  $query = "SELECT * FROM $table_name WHERE post_type = %s";
  $find_data = $wpdb->get_row($wpdb->prepare($query, $post_type));

  $meta_value = get_post_meta($post->ID, meta_key($post->ID), true);

  if ($meta_value && $find_data->value === StructuredDataTool::CHECKED_VALUE) {
    printf('<script type="application/ld+json">%s</script>', $meta_value);
  }
}
add_action('wp_footer', 'insert_structured_data');
