var marisa = require('node-marisa-trie');

var keyset = marisa.createKeyset();
keyset.push_back("a");
keyset.push_back("app");
keyset.push_back("apple");

var trie = marisa.createTrie();
trie.build(keyset);

var agent = marisa.createAgent();
agent.set_query("apple");
while (trie.common_prefix_search(agent)) {
    var key = agent.key();
    console.log(key.ptr().substring(0, key.length()));
}

trie.save('test.bin');

fs = require('fs');
fs.readFile('test.bin', function (err, data) {
  if (err) {
    console.error(err);
    return;
  }
  trie = marisa.createTrie();
  trie.map(data);
  for (var i = 0; i < 3; ++i) {
    var agent = marisa.createAgent();
    agent.set_query(i);
    trie.reverse_lookup(agent);
    var key = agent.key();
    console.log(i + ": " + key.ptr().substring(0, key.length()));
  }
});
