const fs = require('fs');  // We still need `fs` to write to a file.

const fetches = async () => {
  const pollDataFile = 'pollsAPI23000.json';
  fs.writeFileSync(pollDataFile, '[\n', 'utf8');  
    let polls = 0;

    for (let i = 23000; i < 24000; i++) {
      setTimeout(async()=>{
          for (let j = (i*1000)+1; j < ((i+1)*1000)+1; j++) {
              const itemResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${j}.json`);
              const item = await itemResponse.json();
              if (item.type == "poll"){
                const poll = { id: item.id, time: item.time };
                const pollDataJson = JSON.stringify(poll, null, 2);
                  console.log(item)
                  polls++
                  if (polls === 1) {
                    fs.appendFileSync(pollDataFile, pollDataJson);
                } else {
                    fs.appendFileSync(pollDataFile, ',\n' + pollDataJson);
                }

              }
          }
      })
  }

    fs.appendFileSync(pollDataFile, '\n]', 'utf8');
    console.log("Data has been written to polls_and_jobs.json");
};

// Call the fetches function to start processing
fetches();
