<?php
  // プラグインがアンインストールされたときに実行される処理
  // 重要: WP_UNINSTALL_PLUGINが定義されているか、アンインストール処理前にチェックしなければならない。
  // https://elearn.jp/wpman/function/register_uninstall_hook.html
  if (!defined('WP_UNINSTALL_PLUGIN'))
  exit ();

  global $wpdb;

  delete_option('my_db_version');
  $table_name = $wpdb->prefix . StructuredDataTool::TABLE_NAME;

  $sql = "DROP TABLE $table_name";
  $wpdb->query($sql);
