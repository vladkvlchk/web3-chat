export const contractConfig = {
  address: "0x3240Ef7f8922128621983F8Dbc1067263A1E8A06" as `0x${string}`,
  abi: [
    {
      inputs: [{ internalType: "string", name: "_text", type: "string" }],
      name: "storeMessage",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getAllMessages",
      outputs: [
        {
          components: [
            { internalType: "address", name: "sender", type: "address" },
            { internalType: "string", name: "text", type: "string" },
          ],
          internalType: "struct MessageBoard.Message[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
};
