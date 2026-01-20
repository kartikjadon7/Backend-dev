const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (path === "/complain") {

        const name = query.name;
        const issue = query.issue;
        const priority = query.priority;

        const ticketId = "TKT-" + Math.floor(Math.random() * 100000);

        const log = `Ticket: ${ticketId}
Name: ${name}
Issue: ${issue}
Priority: ${priority}

`;

        if (priority === "high") {
            fs.appendFile("URGENT.txt", log, () => {});
        } else {
            fs.appendFile("normal_complaints.txt", log, () => {});
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            ticketId: ticketId,
            message: "We will solve your issue soon."
        }));
    }

    else if (path === "/admin") {

        const user = query.user;
        const pass = query.pass;

        if (user === "admin" && pass === "1234") {

            fs.readFile("admin_dashboard.html", (err, data) => {
                if (err) {
                    res.end("File not found");
                    return;
                }
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            });

        } else {
            res.writeHead(401, { "Content-Type": "text/plain" });
            res.end("Access Denied");
        }
    }

    else {
        res.end("Route not found");
    }

});

server.listen(8000);
