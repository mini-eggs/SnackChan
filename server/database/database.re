open Mysql;

let db = quick_connect 
  socket::"/Applications/MAMP/tmp/mysql/mysql.sock" 
  host::"localhost" 
  port::3306 
  user::"root" 
  password::"root" 
  database::"snackchan-local" 
  ();

let getDatabase () => db;

let count_of_fetch some_fetch => {
  let snag_row_values item => {
    switch item {
    | Some s => int_of_string s
    | None => 0
    };
  };
  let count_array = switch some_fetch {
  | Some arr => Array.map snag_row_values arr
  | None => [| 0 |]
  };
  count_array.(0);
};