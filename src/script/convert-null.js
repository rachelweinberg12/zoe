import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://emqmvubrovsmdfjrbqjr.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtcW12dWJyb3ZzbWRmanJicWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI2MzYwNzEsImV4cCI6MTk4ODIxMjA3MX0.pIUyywodqU9ZkXMYF_M_ckpSsm7EzFC9FPih7NaPDOI';
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * @param {string} value
 */
function cleanValue(value) {
	if (value === '\\N') {
		return null;
	} else {
		return value;
	}
}

async function getDonations() {
	const { data, error } = await supabase.from('donations').select().eq('donor_donee_reason', '\\N');
	if (error) {
		console.log('error in getDonations', error);
	}

	return data ?? [];
}

let donations = await getDonations();

for (let i = 0; i < donations.length; i++) {
	const { error } = await supabase
		.from('donations')
		.update({
			donor_donee_reason: cleanValue(donations[i].donor_donee_reason)
		})
		.eq('donation_id', donations[i].donation_id);
	if (error) {
		console.log(error);
	}
	console.log('updated', donations[i].donation_id);
}
