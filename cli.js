#!/usr/bin/env node
import meow from 'meow';
import {publicIpv4, publicIpv6} from 'public-ip';

const cli = meow(`
	Usage
	  $ public-ip

	Options
	  --ipv4, -4          Return the IPv4 address (default)
	  --ipv6, -6          Return the IPv6 address
	  --https, -h         Use HTTPS instead of DNS
	  --timeout=<ms>, -t  Timeout in milliseconds (default: 5000)

	Example
	  $ public-ip
	  46.5.21.123
`, {
	importMeta: import.meta,
	flags: {
		ipv4: {
			type: 'boolean',
			shortFlag: '4',
		},
		ipv6: {
			type: 'boolean',
			shortFlag: '6',
		},
		https: {
			type: 'boolean',
			shortFlag: 'h',
		},
		timeout: {
			type: 'string',
			shortFlag: 't',
		},
	},
});

const getIp = cli.flags.ipv6 ? publicIpv6 : publicIpv4;

const ip = await getIp({
	https: cli.flags.https ? true : undefined,
	timeout: cli.flags.timeout !== undefined && Number(cli.flags.timeout),
});

console.log(ip);
