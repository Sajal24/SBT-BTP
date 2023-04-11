import { ethers } from "./node_modules/ethers";
import { NFTStorage } from "./node_modules/nft.storage";
import { contractABI, contractAddress } from "./constants.js";
require("dotenv").config();

const NFTStorageToken = process.env.NFT_STORAGE_TOKEN;
const client = new NFTStorage({ token: NFTStorageToken });

// ETHERS.JS Setup
const apiKey = process.env.ALCHEMY_API_KEY;

// Interaction part1 - uplaod student details to NFT.storage
let sName;
let sAccount;
let sRollno;
let sAddress;
let sDob;
let sPhoto;
let sObject;
let cid;
let data;
let metadataURL;
let metadataContents;
let metadataProperties;
let metadataGatewayURLs;

//code for uploading image to NFT.storage
const input = document.getElementById("input");
const output = document.getElementById("output");
const btn2 = document.getElementById("process_id");
const connectBtn = document.getElementById("connect-Btn");

//connecting to metamask
async function connect() {
  if (window.ethereum) {
    await ethereum.request({ method: "eth_requestAccounts" });
    console.log("connected to metamask!");
    connectBtn.innerHTML = "Connected";
  } else {
    connectBtn.innerHTML = "Please download Metamask extension";
  }
}

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, contractABI, signer);

input.addEventListener("change", () => {
  console.log("photo uploaded to client-side");
  const file = input.files;
  sPhoto = file[0];
  displayImage();
});

btn2.addEventListener("click", async () => {
  await uploadToJson();
});

async function uploadToJson() {
  console.log("btn2 activated.");

  sName = document.getElementById("name").value;
  console.log(sName);
  sAccount = document.getElementById("account").value;
  sRollno = document.getElementById("roll").value;
  sAddress = document.getElementById("address").value;
  sDob = document.getElementById("date").value;

  sObject = `{ sName : "${sName}", sAccount : "${sAccount}", sRollno : "${sRollno}", sAddress : "${sAddress}", sDob : "${sDob}", sPhoto" : ${sPhoto}" }`;
  console.log(sObject);
  console.log("Data will be uploaded to NFT.storage");

  // uploading to NFT.Storage
  const metadata = await client.store({
    name: "nft.storage store test",
    description: "Test ERC-1155 compatible metadata.",
    image: sPhoto,
    properties: {
      sName: sName,
      sAccount: sAccount,
      sRollno: sRollno,
      sAddress: sAddress,
      sDob: sDob,
      sPhoto: sPhoto,
    },
  });

  console.log("metadata:\n", metadata);
  data = metadata;
  cid = metadata.ipnft;
  console.log("cid: ", cid);
  console.log("IPFS URL for the metadata:\n", metadata.url);
  metadataURL = metadata.url;

  console.log("metadata.json contents:\n", metadata.data);
  metadataContents = metadata.data;

  console.log("metadata.json properties:\n", metadata.data.properties);
  metadataProperties = metadata.data.properties;

  // console.log("metadata.json with IPFS gateway URLs:\n", metadata.embed());
  metadataGatewayURLs = metadata.embed();

  // console.log("restart");
  // console.log(data);
  // console.log(metadataURL);
  // console.log(metadataContents);
  // console.log(metadataProperties);
  // console.log(metadataGatewayURLs);
  // await uploadToBlockchain(cid);
}
// end uploadToJson()

async function uploadToBlockchain(_cid) {
  const uniAddress = contract.address; // default getter method for public variables
  console.log("The address of the university is:", uniAddress);

  const addTx = await contract.addStudent(UNI_ACCOUNT, _cid);
  await addTx.wait(1); // waiting for this transaction to be mined in the blockchain be waiting till 1 block confirmation(s)
  console.log(
    "addStudent() executed.\nAdded to blockchain with 1 block confirmation."
  );
}
// // end uploadToBlockchain()

function displayImage() {
  console.log("displayImage() activated.");
  let images = "";
  images = `<div class="image">
  <img src="${URL.createObjectURL(sPhoto)}" alt="image">
  <!--
  <span onclick="deleteImage(${0})">&times;</span>
  -->
  </div>`;

  output.innerHTML = images;
}

// /*
// let imagesArray = [];
// function displayImages() {
//   let images = "";
//   imagesArray.forEach((image, index) => {
//     images += `<div class="image">
//                     <img src="${URL.createObjectURL(image)}" alt="image">
//                     <span onclick="deleteImage(${index})">&times;</span>
//                   </div>`;
//   });
//   output.innerHTML = images;
// }

// function deleteImage(index) {
//   imagesArray.splice(index, 1);
//   displayImages();
// }
// */
