<?php
$structuredDataTool = new StructuredDataTool();
$post_types = $structuredDataTool->get_table_data();

// チェックがついているときは数字の1が返却される
$active_custom_field_num = 1;

// 保存処理
function save_setting()
{

}
?>

<h2>設定</h2>
<form method="POST">
  <?php foreach($post_types as $arr): ?>
    <div>
      <input
        type="checkbox"
        id="<?= $arr['post_type']; ?>"
        name="post_types[]"
        value="<?= $arr['value']; ?>"
        <?= (int)$arr['value'] === $active_custom_field_num ? 'checked' : ''; ?> 
      >
      <label for="<?= $arr['post_name']; ?>">
        <?= $arr['post_name']; ?>
      </label>
    </div>
  <?php endforeach; ?>
  <input class="button button-primary button-large" type="submit" name="save_setting" value="登録" />
</form>
