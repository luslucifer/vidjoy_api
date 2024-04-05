import axios from 'axios'

const url = 'https://nanonexustech5.link/cdn/H4sIAAAAAAAAAwXB0W6DIBQA0F.ioKZtsodZpKyJ11UBW98QXEgLSkzIjF_fc_6KgiCCdWHw0RyJxZnONMmJQflkTG7PtVIUwpbG7vQLXOJJeqofLjbV8t9RiJK.M40PSTMW9VztAi.r2AcueXmDSoF6ed4wuNl5qOvgUi39.gwxjdft0vSOS8VaCHYRhxbZwPwoPJt6cFpuuH3YWTFVqmu8t8ynjpasE_f1iQDBPrxF2H4AxdwE1w_z99cHLKFNz80AAAA-/list.m3u8l'
async function name() {
	try {
		const res = await (await axios.get(url)).status
		console.log(res)
		
	} catch (error) {
		console.error(error)
	}
	
	
}

name()