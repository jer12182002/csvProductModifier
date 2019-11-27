var fs = require('fs');
var csv = require('fast-csv');
var createCsvWriter = require('csv-writer').createObjectCsvWriter;
var list = [];
var data = '';


csv.fromPath('product.csv')
	.on('data', data => {
		if(data!=''){
			var obj = {
				original: data[0],
				new: data[0].replace('*', 'x')
			                .replace('Acupuncture ','')
			                .replace('Japanese ','')
			                .replace(' 100pcs','')          //lines above are for needles
			                .replace('Low- Frequency 7 Channel Tens Unit and Electrical Needles Stimulator','tens')
			                .replace('Chinese Herbal Medicine: Formulas & Strategies: 2nd Portable Edition','Formula')
			                .replace('Clinical Handbook of Internal Medicine: The Treatment of Disease With Traditional Chinese Medicine','Internal Medicine')
			                .replace('Diagnosis in Chinese Medicine','Diagnosis')
			                .replace('Handbook of Oriental Medicine 3rd','Handbook 3rd')
			                .replace('Handbook of Oriental Medicine 5th','Handbook 5th')
			                .replace('Integrative Pharmacology (2nd Edition Integrated Pharmacology): Combining Modern Pharmacology with Integrative Medicine','Integrative Pharmacology')
			                .replace('Manual of Acupuncture Deadman','Acupuncture Deadman')
			                .replace('The Foundations of Chinese Medicine: A Comprehensive Text','Foundations')     // lines above are for books
			                .replace(' - Special Deal','')
			                .replace('(','')
			                .replace(')','')
			                .replace(/[^a-z\d\s]+/gi,'')
			                .trim()
			}

			list.push(obj);
		}
	})
	.on('error',(err)=>{
		console.log(err);
	})
	.on('end',()=>{	
		list.forEach(item => { console.log(item)});

		var write = createCsvWriter({
			path: 'new.csv',
			header: [
				{id: 'original', title: 'Original'},
				{id: 'new', title: 'New'}
			]
		});

		write.writeRecords(list)
			.then(()=>{
				console.log('done');
			});
	});




/*.replace('*', 'x')
			                .replace('Acupuncture ','')
			                .replace('Japanese ','')
			                .replace(' 100pcs','')          //lines above are for needles
			                .replace('Low- Frequency 7 Channel Tens Unit and Electrical Needles Stimulator','tens')
			                .replace('Chinese Herbal Medicine: Formulas & Strategies: 2nd Portable Edition','Formula')
			                .replace('Clinical Handbook of Internal Medicine: The Treatment of Disease With Traditional Chinese Medicine','Internal Medicine')
			                .replace('Diagnosis in Chinese Medicine','Diagnosis')
			                .replace('Handbook of Oriental Medicine 3rd','Handbook 3rd')
			                .replace('Handbook of Oriental Medicine 5th','Handbook 5th')
			                .replace('Integrative Pharmacology (2nd Edition Integrated Pharmacology): Combining Modern Pharmacology with Integrative Medicine','Integrative Pharmacology')
			                .replace('Manual of Acupuncture Deadman','Acupuncture Deadman')
			                .replace('The Foundations of Chinese Medicine: A Comprehensive Text','Foundations')     // lines above are for books
			                .replace('(','')
			                .replace(')','')
			                .replace(/[^a-z\d\s]+/gi,'')
			                .trim()*/