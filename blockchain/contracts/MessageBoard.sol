// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MessageBoard {
    struct Message {
        address sender;
        string text;
    }

    Message[] public messages;

    function storeMessage(string memory _text) public {
        messages.push(Message(msg.sender, _text));
    }

    function getAllMessages() public view returns (Message[] memory) {
        return messages;
    }
}
