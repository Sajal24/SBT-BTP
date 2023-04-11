export const contractAddress = "0x884519b97b0377753507E7b02e4AaA959508490A";
export const contractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "NotUniAccessDenied",
    type: "error",
  },
  {
    inputs: [],
    name: "StudentDoesNotExists",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_acc",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_cid",
        type: "string",
      },
    ],
    name: "AddedStudent",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_acc",
        type: "address",
      },
      {
        internalType: "string",
        name: "_cid",
        type: "string",
      },
    ],
    name: "addStudent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "i_uniAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_acc",
        type: "address",
      },
    ],
    name: "searchStudent",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
