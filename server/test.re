open OUnit2;
open Core;

/**
 * Tests.
 */
let test_create_user test_ctxt => {
  let db = Database.getDatabase ();

  let time = Time_ns.now() |> Time_ns.to_string;
  let device_id = "bogus_device_id" ^ time;
  let bogus_push_id = "bogus_push_id" ^ time;

  let pre_count = Mysql.exec db "SELECT count(id) as count FROM users"
    |> Mysql.fetch
    |> Database.count_of_fetch;

  User.create_new_user device_id bogus_push_id;

  let post_count = Mysql.exec db "SELECT count(id) as count FROM users"
    |> Mysql.fetch
    |> Database.count_of_fetch;

  assert_equal msg::"Failed to create user." ( pre_count + 1 ) ( post_count );
};

let suite = 
  "suite">:::[
    "test_create_user">::test_create_user,
  ];

let () = run_test_tt_main suite;
