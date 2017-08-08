open Mysql;
open Pervasives;
open Lwt;
open Cohttp_lwt_unix;

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

  

let send_notifcation device_id push_token => {
  let uri = Uri.of_string "https://exp.host/--/api/v2/push/send";
  let headers = Cohttp.Header.init_with "Content-Type" "application/json";
  
  let body = `Assoc [ 
    ("to", `String push_token),  
    ("data", `Assoc [
      ("message", `String "Here we go")
    ]), 
    ("title", `String "Title here"),
    ("body", `String "Body here"),
    ("sound", `String "default"),
    ("priority", `String "normal"),
    ("badge", `Int 1)
  ] |> Yojson.Basic.pretty_to_string
    |> Cohttp_lwt_body.of_string;

  Client.post headers::headers body::body uri >>= fun (response, data) => {
    Cohttp_lwt_body.to_string data >>= fun body_string => {
      body_string
      |> Yojson.Basic.from_string
      |> Lwt.return 
    }
  }; 
};
