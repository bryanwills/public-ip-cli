import process from 'node:process';
import test from 'ava';
import {execa} from 'execa';
import {isIPv4, isIPv6} from 'is-ip';

test('no arguments', async t => {
	const {stdout} = await execa('./cli.js');
	t.true(isIPv4(stdout));
});

test('-h', async t => {
	const {stdout} = await execa('./cli.js', ['-h']);
	t.true(isIPv4(stdout));
});

test('-4', async t => {
	const {stdout} = await execa('./cli.js', ['-4']);
	t.true(isIPv4(stdout));
});

if (!process.env.CI) {
	test('-4 -h -t 1', async t => {
		await t.throwsAsync(execa('./cli.js', ['-4', '-h', '-t', '1']));
	});

	test('-6', async t => {
		const {stdout} = await execa('./cli.js', ['-6']);
		t.true(isIPv6(stdout));
	});

	test('-6 -h -t 1', async t => {
		await t.throwsAsync(execa('./cli.js', ['-6', '-h', '-t', '1']));
	});
}
