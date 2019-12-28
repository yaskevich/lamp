const fetch = require('node-fetch');
	
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// async function goo(q) {
  // try {
    // const res = 
    // const { status } = res; 
    // return status;
  // } catch (err) {
   // // handle error for example
    // console.error(err);
  // }
// }

// <CompleteSuggestion><suggestion data="happy hour meme"/></CompleteSuggestion>
// The newer URL is now http://clients1.google.com/complete/search?hl=en&output=toolbar&q=YOURSEARCHTERM

// stackoverflow.com/questions/5102878/where-is-the-documentation-for-the-google-suggest-api
// Or even more recent: http://suggestqueries.google.com/complete/search?output=toolbar&hl=en&q=YOURSEARCHTERM


// https://yandex.ru/suggest/suggest-ya.cgi?srv=morda_ru_desktop&wiz=TrWth&uil=ru&fact=1&v=4&icon=1&lr=213&hl=1&bemjson=1&html=1&platform=desktop&rich_nav=1&show_experiment=222&show_experiment=224&verified_nav=1&rich_phone=1&yu=2490968071573670298&sn=5&callback=jQuery18305388359737105604_1573670300341&part=%D0%BA%D0%BE%D1%82&pos=3&suggest_reqid=249096807157367029803004508761887&svg=1



async function gooXML (q) {
	const url = 'https://clients1.google.com/complete/search?hl=en&output=toolbar&q='+encodeURIComponent(q);
	// console.log(url);
    const response = await fetch(url);
    const json = await response.text();
	return json;
    // console.log(json);
}




async function google (q, n=0) {
	const endpoints =  [
		// 'http://google.com/complete/search?client=firefox&q=',
		// 'http://suggestqueries.google.com/complete/search?output=toolbar&hl=ru&client=firefox&q=',
		'https://www.google.com/complete/search?cp='+q.length+'&client=psy-ab&xssi=t&gs_ri=gws-wiz&hl=ru&authuser=0&q=',
		'https://yandex.ru/suggest/suggest-ya.cgi?srv=morda_ru_desktop&wiz=TrWth&uil=ru&fact=1&v=4&icon=1&lr=213&hl=1&bemjson=0&html=1&platform=desktop&rich_nav=1&show_experiment=222&show_experiment=224&verified_nav=1&rich_phone=1&sn=5&pos=3&svg=1&part='		
	]
	const url = endpoints[n]+encodeURIComponent(q);
	// console.log(url);
    const response = await fetch(url, { method: 'GET',  headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:54.0) Gecko/20100101 Firefox/70.0"}});
		let txt = await response.text(	);
		console.log(txt);
		const pre = txt.replace(/^\)\]\}\'/, '');
		console.log(pre);
		return JSON.parse(pre);
	// return await response.json();
}



async function goo (q, n=0) {
	const endpoints =  [
			'https://yandex.ru/suggest/suggest-ya.cgi?srv=morda_ru_desktop&wiz=TrWth&uil=ru&fact=1&v=4&icon=1&lr=213&hl=1&bemjson=0&html=1&platform=desktop&rich_nav=1&show_experiment=222&show_experiment=224&verified_nav=1&rich_phone=1&sn=5&pos=3&svg=1&part='		
	]
	const url = endpoints[0]+encodeURIComponent(q);
	// console.log(url);
    const response = await fetch(url, { method: 'GET',  headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:54.0) Gecko/20100101 Firefox/70.0"}});
	return await response.json();
}


var htmlEntities = {
    nbsp: ' ',
    cent: '¢',
    pound: '£',
    yen: '¥',
    euro: '€',
    copy: '©',
    reg: '®',
    lt: '<',
    gt: '>',
    quot: '"',
    amp: '&',
    apos: '\''
};

function unescapeHTML(str) {
    return str.replace(/\&([^;]+);/g, function (entity, entityCode) {
        var match;

        if (entityCode in htmlEntities) {
            return htmlEntities[entityCode];
            /*eslint no-cond-assign: 0*/
        } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
            return String.fromCharCode(parseInt(match[1], 16));
            /*eslint no-cond-assign: 0*/
        } else if (match = entityCode.match(/^#(\d+)$/)) {
            return String.fromCharCode(~~match[1]);
        } else {
            return entity;
        }
    });
};


const GOOGLE = 0
const YANDEX = 1;

async function demo() {
	// const queries = [" ", "happy", "happy hour", "happy hour of", "happy hour of your"]
	const queries = ["я", "думаю", "что", "ты", "очень"]
	
	let sz = queries.length;
	// sz = 1;
	// let src = GOOGLE;
	let src = YANDEX;
	let q = "";
  // Sleep in loop
  for (let i = 0; i < sz; i++) {	  
	  q += " " + queries[i];
	  q = q.trim()
	  console.log(i, q);
	  let a  = await goo(q, src);
	  // console.log(a[1].map(unescapeHTML));
	  // let res = a.match(/(?<=data\=\").*?(?=\")/g);
	  // if (res && res.length){		  
		// console.log(res.map(unescapeHTML));
	  // }
	  
	  
	  if (src === YANDEX) {
		  // console.log(JSON.stringify(a));
		  a[1].forEach(function callback(val, index, array) {
				console.log(val[1]);
			});
			console.log(">>", q+a[2]["continue"]);
	  } else {
		  console.log(a);
	  }
	  
	  
	// console.log("happy hour")
    // if (i === 3) {
	
    await sleep(2000);
	// }
    // console.log(i);
  }
}

demo();	