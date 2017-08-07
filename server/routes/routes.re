open Lwt;
open Cohttp;
open Cohttp_lwt_unix;
open Yojson;
open Core.Std;

/**
 * Utility function.  
 */
let build_response (status: int) (message: string) => {
  let json = `Assoc [ 
    ("status", `Int status),  
    ("message", `String message)
  ];
  let body = Yojson.Basic.pretty_to_string json;
  Server.respond_string status::`OK body::body;
};

/**
 * Routes.
 */

let test_send_notification _ => {
  let device_id = "547EAFE5-F9CF-4B4B-8C23-16037A8A2D54";
  let token_id = "ExponentPushToken[tMCNHSPqhFGDMoK2iz-cqO]";
  User.send_notifcation device_id token_id >>= fun status => {
    let value = status ? 1 : 0;
    build_response value "Complete." ();
  }; 
};

let post_register_device_and_token body => {
  (Cohttp_lwt_body.to_string body) >>= fun body => {
    let decoded_body = body |> Yojson.Basic.from_string;
    let device_id = decoded_body |> Yojson.Basic.Util.member "device_id" |> Yojson.Basic.Util.to_string;
    let push_token = decoded_body|> Yojson.Basic.Util.member "push_token" |> Yojson.Basic.Util.to_string;
    let response = "device: " ^ device_id ^ "\n" ^ "token: " ^ push_token;
    User.create_new_user device_id push_token;
    build_response 1 response ();
  };
};

let test_notification body => {
  (Cohttp_lwt_body.to_string body) >>= fun body => {
    let push_token = body
      |> Yojson.Basic.from_string 
      |> Yojson.Basic.Util.member "push_token"
      |> Yojson.Basic.Util.to_string;
    build_response 1 push_token ();
  };
};

let test_token () => {
  let token = Lib.create_token "24";
  build_response 1 token ();
};

let get_token body => {
  (Cohttp_lwt_body.to_string body) >>= fun body => {
    let user_token = body
      |> Yojson.Basic.from_string 
      |> Yojson.Basic.Util.member "user_id"
      |> Yojson.Basic.Util.to_string
      |> Lib.create_token;
    build_response 1 user_token (); 
  }; 
};

let default_route () => {
  build_response 1 "Welcome to Snack Chan server" ();
};

let error_route () => {
  build_response (-1) "Error" ();
};