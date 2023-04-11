import { ethers } from "./node_modules/ethers";
import { NFTStorage } from "./node_modules/nft.storage";
require("dotenv").config();

const NFTStorageToken = process.env.NFT_STORAGE_TOKEN;
const client = new NFTStorage({ token: NFTStorageToken });

// ETHERS.JS Setup
const apiKey = process.env.ALCHEMY_API_KEY;
// const PRIVATE_KEY = process.env.PRIVATE_KEY;
// const CONRACT_ADDRESS = process.env.CONRACT_ADDRESS;
// const { ethers } = require("hardhat"); // reference to ethers
// import contract from "../smartContracts/artifacts/contracts/SBTFactory.sol/SBTFactory.json" assert { type: "json" };
// const contract = require("smartContracts/artifacts/contracts/SBTFactory.sol/SBTFactory.json");

// Provider
const provider = new ethers.providers.AlchemyProvider([
  (network = "maticmum"),
  [apiKey],
]);

// Wallet
const wallet = new ethers.Wallet([process.env.PRIVATE_KEY, provider]);

// getting
const address = wallet.address;
console.log(address);

// contract instance
// const sbtContract = new ethers.Contract(CONRACT_ADDRESS, contract.abi, signer);

// console.log("website loaded");

// let sName;
// let sAccount;
// let sRollno;
// let sAddress;
// let sDob;
// let sPhoto;

// let sObject;

// let cid;
// let meta;
// let metadataURL;
// let metadataContents;
// let metadataProperties;
// let metadataGatewayURLs;

// //code for uploading image to NFT.storage
// const input = document.getElementById("input");
// const output = document.getElementById("output");
// const btn2 = document.getElementById("process_id");

// //code for connecting metamask wallet to the website
// const connectWallet = document.getElementById("connect-btn");
// console.log(connectWallet);

// input.addEventListener("change", () => {
//   console.log("photo uploaded to client-side");
//   const file = input.files;
//   sPhoto = file[0];
//   displayImage();
// });

// btn2.addEventListener("click", async () => {
//   await uploadToJson();
// });

// async function uploadToJson() {
//   console.log("btn2 activated.");

//   sName = document.getElementById("name").value;
//   console.log(sName);
//   sAccount = document.getElementById("account").value;
//   sRollno = document.getElementById("roll").value;
//   sAddress = document.getElementById("address").value;
//   sDob = document.getElementById("date").value;

//   sObject = `{ sName : "${sName}", sAccount : "${sAccount}", sRollno : "${sRollno}", sAddress : "${sAddress}", sDob : "${sDob}", sPhoto" : ${sPhoto}" }`;
//   console.log(sObject);
//   console.log("Data will be uploaded to NFT.storage");

//   // uploading to NFT.Storage

//   const metadata = await client.store({
//     name: "nft.storage store test",
//     description: "Test ERC-1155 compatible metadata.",
//     image: sPhoto,
//     properties: {
//       sName: sName,
//       sAccount: sAccount,
//       sRollno: sRollno,
//       sAddress: sAddress,
//       sDob: sDob,
//       sPhoto: sPhoto,
//     },
//   });

//   console.log("metadata:\n", metadata);
//   meta = metadata;
//   cid = metadata.ipnft;
//   console.log("cid: ", cid);
//   console.log("IPFS URL for the metadata:\n", metadata.url);
//   metadataURL = metadata.url;

//   console.log("metadata.json contents:\n", metadata.data);
//   metadataContents = metadata.data;

//   console.log("metadata.json properties:\n", metadata.data.properties);
//   metadataProperties = metadata.data.properties;

//   // console.log("metadata.json with IPFS gateway URLs:\n", metadata.embed());
//   metadataGatewayURLs = metadata.embed();

//   // console.log("restart");
//   // console.log(meta);
//   // console.log(metadataURL);
//   // console.log(metadataContents);
//   // console.log(metadataProperties);
//   // console.log(metadataGatewayURLs);
//   // await uploadToBlockchain(cid);
// }
// // end uploadToJson()

// async function uploadToBlockchain(_cid) {
//   const uni = await sbtContract.uni(); // default getter method for public variables
//   console.log("The address of the university is:", uni);

//   const addTx = await sbtContract.addStudent(UNI_ACCOUNT, _cid);
//   await addTx.wait(1); // waiting for this transaction to be mined in the blockchain be waiting till 1 block confirmation(s)
//   console.log(
//     "addStudent() executed.\nAdded to blockchain with 1 block confirmation."
//   );
// }
// // end uploadToBlockchain()

// function displayImage() {
//   console.log("displayImage() activated.");
//   let images = "";
//   images = `<div class="image">
//   <img src="${URL.createObjectURL(sPhoto)}" alt="image">
//   <!--
//   <span onclick="deleteImage(${0})">&times;</span>
//   -->
//   </div>`;

//   output.innerHTML = images;
// }

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
