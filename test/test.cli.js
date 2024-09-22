/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var resolve = require( 'path' ).resolve;
var exec = require( 'child_process' ).exec;
var tape = require( 'tape' );
var replace = require( '@stdlib/string-replace' );
var trim = require( '@stdlib/string-trim' );
var RE_EOL = require( '@stdlib/regexp-eol' ).REGEXP;
var isAbsolutePath = require( '@stdlib/assert-is-absolute-path' );
var contains = require( '@stdlib/array-base-assert-contains' );
var IS_BROWSER = require( '@stdlib/assert-is-browser' );
var IS_WINDOWS = require( '@stdlib/assert-is-windows' );
var EXEC_PATH = require( '@stdlib/process-exec-path' );
var readFileSync = require( '@stdlib/fs-read-file' ).sync;


// VARIABLES //

var fpath = resolve( __dirname, '..', 'bin', 'cli' );
var opts = {
	'skip': IS_BROWSER || IS_WINDOWS
};


// FIXTURES //

var PKG_VERSION = require( './../package.json' ).version;


// TESTS //

tape( 'command-line interface', function test( t ) {
	t.ok( true, __filename );
	t.end();
});

tape( 'when invoked with a `--help` flag, the command-line interface prints the help text to `stderr`', opts, function test( t ) {
	var expected;
	var cmd;

	expected = readFileSync( resolve( __dirname, '..', 'docs', 'usage.txt' ), {
		'encoding': 'utf8'
	});
	cmd = [
		EXEC_PATH,
		fpath,
		'--help'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		if ( error ) {
			t.fail( error.message );
		} else {
			t.strictEqual( stdout.toString(), '', 'does not print to `stdout`' );
			t.strictEqual( stderr.toString(), expected+'\n', 'expected value' );
		}
		t.end();
	}
});

tape( 'when invoked with a `-h` flag, the command-line interface prints the help text to `stderr`', opts, function test( t ) {
	var expected;
	var cmd;

	expected = readFileSync( resolve( __dirname, '..', 'docs', 'usage.txt' ), {
		'encoding': 'utf8'
	});
	cmd = [
		EXEC_PATH,
		fpath,
		'-h'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		if ( error ) {
			t.fail( error.message );
		} else {
			t.strictEqual( stdout.toString(), '', 'does not print to `stdout`' );
			t.strictEqual( stderr.toString(), expected+'\n', 'expected value' );
		}
		t.end();
	}
});

tape( 'when invoked with a `--version` flag, the command-line interface prints the version to `stderr`', opts, function test( t ) {
	var cmd = [
		EXEC_PATH,
		fpath,
		'--version'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		if ( error ) {
			t.fail( error.message );
		} else {
			t.strictEqual( stdout.toString(), '', 'does not print to `stdout`' );
			t.strictEqual( stderr.toString(), PKG_VERSION+'\n', 'expected value' );
		}
		t.end();
	}
});

tape( 'when invoked with a `-V` flag, the command-line interface prints the version to `stderr`', opts, function test( t ) {
	var cmd = [
		EXEC_PATH,
		fpath,
		'-V'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		if ( error ) {
			t.fail( error.message );
		} else {
			t.strictEqual( stdout.toString(), '', 'does not print to `stdout`' );
			t.strictEqual( stderr.toString(), PKG_VERSION+'\n', 'expected value' );
		}
		t.end();
	}
});

tape( 'the command-line interface resolves the first path match from a set of paths by walking parent directories (mode=first)', opts, function test( t ) {
	var cmd = [
		EXEC_PATH,
		fpath,
		'--mode',
		'first',
		'--dir',
		__dirname,
		'package.json',
		'beep-boop!!!helloWorld!?!'
	];
	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		var actual;
		if ( error ) {
			t.fail( error.message );
		} else {
			actual = trim( stdout ).split( RE_EOL );
			t.strictEqual( actual.length, 1, 'returns expected value' );

			t.strictEqual( isAbsolutePath( actual[ 0 ] ), true, 'returns expected value' );
			t.strictEqual( actual[ 0 ], resolve( __dirname, '..', 'package.json' ), 'returns expected value' );

			t.strictEqual( stderr.toString(), '', 'does not print to `stderr`' );
		}
		t.end();
	}
});

tape( 'the command-line interface resolves one or more paths from a set of paths at a directory level by walking parent directories (mode=some)', opts, function test( t ) {
	var cmd = [
		EXEC_PATH,
		fpath,
		'--mode',
		'some',
		'--dir',
		__dirname,
		'package.json',
		'beep-boop!!!helloWorld!?!',
		'README.md'
	];
	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		var actual;
		if ( error ) {
			t.fail( error.message );
		} else {
			actual = trim( stdout ).split( RE_EOL );
			t.strictEqual( actual.length, 2, 'returns expected value' );

			t.strictEqual( isAbsolutePath( actual[ 0 ] ), true, 'returns expected value' );
			t.strictEqual( contains( actual, resolve( __dirname, '..', 'package.json' ) ), true, 'returns expected value' );

			t.strictEqual( isAbsolutePath( actual[ 1 ] ), true, 'returns expected value' );
			t.strictEqual( contains( actual, resolve( __dirname, '..', 'README.md' ) ), true, 'returns expected value' );

			t.strictEqual( stderr.toString(), '', 'does not print to `stderr`' );
		}
		t.end();
	}
});

tape( 'the command-line interface resolves all paths from a set of paths at a directory level by walking parent directories (mode=all)', opts, function test( t ) {
	var cmd = [
		EXEC_PATH,
		fpath,
		'--mode',
		'all',
		'--dir',
		__dirname,
		'package.json',
		'README.md'
	];
	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		var actual;
		if ( error ) {
			t.fail( error.message );
		} else {
			actual = trim( stdout ).split( RE_EOL );
			t.strictEqual( actual.length, 2, 'returns expected value' );

			t.strictEqual( isAbsolutePath( actual[ 0 ] ), true, 'returns expected value' );
			t.strictEqual( actual[ 0 ], resolve( __dirname, '..', 'package.json' ), 'returns expected value' );

			t.strictEqual( isAbsolutePath( actual[ 1 ] ), true, 'returns expected value' );
			t.strictEqual( actual[ 1 ], resolve( __dirname, '..', 'README.md' ), 'returns expected value' );

			t.strictEqual( stderr.toString(), '', 'does not print to `stderr`' );
		}
		t.end();
	}
});

tape( 'the command-line interface resolves each path from a set of paths by walking parent directories (mode=each)', opts, function test( t ) {
	var cmd = [
		EXEC_PATH,
		fpath,
		'--mode',
		'each',
		'--dir',
		__dirname,
		'package.json',
		'resolve-parent-paths'
	];
	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		var actual;
		if ( error ) {
			t.fail( error.message );
		} else {
			actual = trim( stdout ).split( RE_EOL );
			t.strictEqual( actual.length, 2, 'returns expected value' );

			t.strictEqual( isAbsolutePath( actual[ 0 ] ), true, 'returns expected value' );
			t.strictEqual( actual[ 0 ], resolve( __dirname, '..', 'package.json' ), 'returns expected value' );

			t.strictEqual( isAbsolutePath( actual[ 1 ] ), true, 'returns expected value' );

			t.strictEqual( stderr.toString(), '', 'does not print to `stderr`' );
		}
		t.end();
	}
});

tape( 'if an error is encountered when reading a file, the command-line interface prints an error and sets a non-zero exit code', opts, function test( t ) {
	var script;
	var opts;
	var cmd;

	script = readFileSync( resolve( __dirname, 'fixtures', 'read_error.js.txt' ), {
		'encoding': 'utf8'
	});

	// Replace single quotes with double quotes:
	script = replace( script, '\'', '"' );

	cmd = [
		EXEC_PATH,
		'-e',
		'\''+script+'\''
	];

	opts = {
		'cwd': __dirname
	};

	exec( cmd.join( ' ' ), opts, done );

	function done( error, stdout, stderr ) {
		if ( error ) {
			t.pass( error.message );
			t.strictEqual( error.code, 1, 'expected exit code' );
		}
		t.strictEqual( stdout.toString(), '', 'does not print to `stdout`' );
		t.strictEqual( stderr.toString(), 'Error: beep\n', 'expected value' );
		t.end();
	}
});
