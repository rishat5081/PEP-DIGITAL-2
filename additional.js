let corsOrigins = ["*", "http://example1.com", "http://example2.com"];

var corsOptionsDelegate = (req, callback) => {
  var corsOptions;
  if (corsOrigins.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

//private key for the API token
// value: ITZ-Solution-PEP-Digital
// done from : https://www.online-toolz.com/tools/text-encryption-decryption.php
const privateKey = "D0gAlqNbzvW3nMWOTijJAA10b6vYfYsSR87KvBJucTM=";

// private key for validate the api before issuing the token
// value : PEP-DIGItal-1-API@Validation@Key_Encrypt@@ion
// done from : https://www.online-toolz.com/tools/text-encryption-decryption.php
const secretKeyToValidateAPI =
  "fIydcKZ1iuBuRO6i5d21YZFZaYJnt9WwW9XKIVRNCXR6gfCAWhxJoteodQWM4/lEzpN84+2quzgyqlOaNEG03Q==";
const saltOfBcrypt = 10;

// ----------------------------- APICredential -------------------------------

const keyBase64 = "DWIzFkO22qfVMgx2fIsxOXnwz10pRuZfFJBvf4RS3eY=",
  ivBase64 = "AcynMwikMkW4c7+mHtwtfw==";

// ----------------------------- Nodemailer Credential -------------------------------
const nodeMailerObject = {
  host: "smtp.gmail.com",
  port: 465,
  secure: "true",
  user: "voip.itz.solutions@gmail.com",
  pass: "icnnrefdmiovthis",
};
module.exports = {
  corsOptionsDelegate,
  privateKey,
  keyBase64,
  ivBase64,
  secretKeyToValidateAPI,
  saltOfBcrypt,
  nodeMailerObject,
};
