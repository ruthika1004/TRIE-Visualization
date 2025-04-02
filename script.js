class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
        this.visualize();
    }

    search(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) return false;
            node = node.children[char];
        }
        return node.isEndOfWord;
    }

    startsWith(prefix) {
        let node = this.root;
        for (let char of prefix) {
            if (!node.children[char]) {
                alert(`No word found with that prefix '${prefix}'`);
                return [];
            }
            node = node.children[char];
        }
        return this.collectWords(node, prefix);
    }

    collectWords(node, prefix) {
        let words = [];
        if (node.isEndOfWord) words.push(prefix);
        for (let char in node.children) {
            words.push(...this.collectWords(node.children[char], prefix + char));
        }
        return words;
    }

    getAllWords() {
        return this.collectWords(this.root, "");
    }

    visualize() {
        const container = document.getElementById("trieContainer");
        container.innerHTML = "";
        container.appendChild(this.createTree(this.root, "Root"));
    }

    createTree(node, char) {
        let nodeElement = document.createElement("div");
        nodeElement.className = "trie-node";
        nodeElement.innerText = char;
        
        let childrenContainer = document.createElement("div");
        childrenContainer.style.display = "flex";
        childrenContainer.style.justifyContent = "center";
        childrenContainer.style.position = "relative";
        
        for (let key in node.children) {
            childrenContainer.appendChild(this.createTree(node.children[key], key));
        }
        nodeElement.appendChild(childrenContainer);
        return nodeElement;
    }
}

const trie = new Trie();

function insertWord() {
    const word = document.getElementById("wordInput").value.trim();
    if (word) trie.insert(word);
}

function searchWord() {
    const word = document.getElementById("searchInput").value.trim();
    alert(trie.search(word) ? "Word found!" : "Word not found.");
}

function searchPrefix() {
    const prefix = document.getElementById("prefixInput").value.trim();
    alert("Words: " + trie.startsWith(prefix).join(", "));
}

function getAllWords() {
    alert("All words: " + trie.getAllWords().join(", "));
}
