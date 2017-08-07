open OUnit2;
open Lwt;
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

  User.create_new_user device_id bogus_push_id;

  let recreate_count = Mysql.exec db "SELECT count(id) as count FROM users"
    |> Mysql.fetch
    |> Database.count_of_fetch;

  assert_equal msg::"Failed to create user." ( pre_count + 1 ) ( post_count );
  assert_equal msg::"Failed to verify user was already created." post_count recreate_count;
};

let test_send_notification test_ctxt => {
    let device_id = "547EAFE5-F9CF-4B4B-8C23-16037A8A2D54";
    let token_id = "ExponentPushToken[tMCNHSPqhFGDMoK2iz-cqO]";

    User.send_notifcation device_id token_id >>= fun status => {
      assert_equal true status |> Lwt.return;
    }; 

    ();
};

let suite = "suite" >::: [
  OUnitTest.TestCase OUnitTest.Short test_create_user,
  /* OUnitTest.TestCase OUnitTest.Huge test_send_notification  */
];

let () = run_test_tt_main suite;
