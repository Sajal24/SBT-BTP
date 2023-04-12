import { ethers } from "./ethers.esm.min.js";
import { NFTStorage } from "nft.storage";
import { contractABI, contractAddress } from "./constants.js";

const NFTStorageToken = import.meta.env.VITE_NFT_STORAGE_TOKEN;
const client = new NFTStorage({ token: NFTStorageToken });

// ETHERS.JS Setup
// const apiKey = process.env.ALCHEMY_API_KEY;

// Interaction part1 - uplaod student details to NFT.storage
let sName;
let sAccount;
let sRollno;
let sAddress;
let sDob;
let sPhoto;
let sObject;
let cid;
let metadataURL;
let metadataContents;
let metadataProperties;
let metadataGatewayURLs;

//code for uploading image to NFT.storage
const input = document.getElementById("input");
const output = document.getElementById("output");
const btn2 = document.getElementById("process_id");
const connectBtn = document.getElementById("connect-btn");

connectBtn.addEventListener("click", async () => {
  await connect();
});

//connecting to metamask
async function connect() {
  if (window.ethereum) {
    await ethereum.request({ method: "eth_requestAccounts" });
    console.log("connected to metamask!");
    console.log(window.ethereum);

    connectBtn.innerHTML = "Connected";
  } else {
    connectBtn.innerHTML = "Please download Metamask extension";
  }
}

input.addEventListener("change", () => {
  console.log("photo uploaded to client-side");
  const file = input.files;
  sPhoto = file[0];
  displayImage();
});

btn2.addEventListener("click", async () => {
  await uploadData();
});

const uploadData = async () => {
  console.log(
    "starting upload of data to nft.storage and then the address and cid to blockchain"
  );

  sName = document.getElementById("name").value;
  console.log(sName);
  sAccount = document.getElementById("account").value;
  sRollno = document.getElementById("roll").value;
  sAddress = document.getElementById("address").value;
  sDob = document.getElementById("date").value;

  sObject = `{ sName : "${sName}", sAccount : "${sAccount}", sRollno : "${sRollno}", sAddress : "${sAddress}", sDob : "${sDob}", sPhoto" : ${sPhoto}" }`;
  console.log(sObject);

  console.log("check 1: data utha liya gaya hai");

  //now we have the cid, we can upload it to the blockchain
  console.log(ethers.providers);

  console.log("check 2: ethers zinda hai");

  console.log(window.ethereum);

  console.log("check 3: window.ethereum zinda hai");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  console.log(provider);
  const signer = new ethers.Wallet(import.meta.env.VITE_PRIVATE_KEY, provider);
  console.log(signer);
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  console.log(await contract.i_uniAddress());

  console.log(contract);
  console.log("check4: contract zinda hai");

  //calling the function to check whether this account already exists on blockchain
  const studentExists = await contract.studentExists(sAccount);
  if (studentExists) {
    console.log("Student already exists on blockchain.");
    return;
  } else {
    console.log("check5: studentExists function zinda hai");
  }

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
  cid = metadata.ipnft;
  console.log("cid: ", cid);

  console.log("check5: cid zinda hai yay");

  // console.log("IPFS URL for the metadata:\n", metadata.url);
  // metadataURL = metadata.url;

  // console.log("metadata.json contents:\n", metadata.data);
  // metadataContents = metadata.data;

  // console.log("metadata.json properties:\n", metadata.data.properties);
  // metadataProperties = metadata.data.properties;

  //calling the function to add the student to the blockchain
  const studentAdded = await contract.addStudent(sAccount, cid);

  console.log("check6: studentAdded function zinda hai");

  //waiting a block for the transaction to be mined
  const receipt = await studentAdded.wait("1");
  console.log(
    `Student added to blockchain with 1 block confirmation and transaction hash: ${receipt.transactionHash}`
  );
};

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
