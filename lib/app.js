var http   = require('http'),
stdin      = process.stdin,
stdout     = process.stdout,
nodemailer = require('nodemailer'),
readline   = require('readline'),
port       = 1337;

process.stdin.setEncoding('utf8');

exports.start = function() {
	var step = ["\n User : ", " Password : ", "\n Email to : "];
	var enter = 0;
	var datas = [];

	stdout.write("\n\033[33mMAILER CONFIGURATOR \033[39m\n");
	stdout.write("Node mailer authentication (Gmail)\n");
	stdout.write(step[0]);
	
	var credentials = {};

	var rl = readline.createInterface({
	  input: stdin,
	  output: stdout
	});

	rl.on('line', function(chunk) {
		enter++;
		if (enter === 1) { stdin.setRawMode(true); }

		if (enter === step.length) {
			datas.push(chunk);
			rl.close();
			launch(datas);
		}
		else {
			stdout.write(step[enter]);
			datas.push(chunk);
		}
	});
};


function launch(datas) {
	process.stdout.write("\033[33mWeb Server started on localhost:"+ port +" \033[39m\n");
	var transporter = nodemailer.createTransport({
	  service: 'Gmail',
	  auth: {
	    user: datas[0],
	    pass: datas[1]
	  }
	});

	http.createServer(function(req, res) {
		if (req.url === '/' && req.method === 'POST') {
			var body = '';

			req.on('data', function(data) {
				body += data;
			});

			req.on('end', function() {
				try {
					var mail = JSON.parse(body).mail;
					var mailOptions = {
				    from: mail.name+' <'+ mail.sender +'>',
				    to: datas[2],
				    subject: 'Contact ',
				    text: mail.message,
				    html: mail.message 
					};
					transporter.sendMail(mailOptions, function(err, info){
						!!err ? console.error(err) : res.end();
					});
				}
				catch(e) {
					console.error(e);
					res.writeHead(400);
					res.end();
				}
			});
		}
		else {
			res.writeHead(400);
		}
	}).listen(1337);
}