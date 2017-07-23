open Jwt; 
open Core.Std;

let default_header = `Assoc [
  ("alg", `String "HS256"),
  ("typ", `String "JWT")
];

let create_token = fun (userID: string): string => {
  let time = Time.now ();
  let timeString = Time.to_string time;
  let tokenize = `Assoc [ 
    ("time", `String timeString),  
    ("userID", `String userID)
  ];
  let header = Jwt.header_of_json default_header;
  let payload = Jwt.payload_of_json tokenize;
  let jwtToken = Jwt.t_of_header_and_payload header payload;
  Jwt.token_of_t jwtToken;  
};