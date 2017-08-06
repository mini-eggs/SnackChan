open Mysql;
open Pervasives;

let snag_row_values item => {
  switch item {
  | Some s => int_of_string s
  | None => 0
  };
};

let create_new_user device_id push_token => {
  let db = Database.getDatabase();
  /* Get number of rows. */
  let count_create = Prepared.create db "SELECT count(id) as count FROM users WHERE device_id = ?";
  let count_execute = Prepared.execute count_create [| device_id |];
  let count_fetch = Prepared.fetch count_execute;
  Prepared.close count_create;
  /* Iterate values ( only only value ). */
  let count_array = switch count_fetch {
  | Some arr => Array.map snag_row_values arr
  | None => [| 0 |]
  };
  /* Snag first value ( onyl value ). */
  let count = count_array.(0);
  /* If no rows insert it. */
  if ( count < 1 ) {
    let insert = Prepared.create db "INSERT INTO users (id, device_id, push_token) VALUES (NULL, ?, ?);";
    ignore ( Prepared.execute insert [| device_id, push_token |] );
    Prepared.close insert;
  }
};