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
var isStringArray = require( '@stdlib/assert-is-string-array' ).primitives;
var isArrayLikeObject = require( '@stdlib/assert-is-array-like-object' );
var cwd = require( '@stdlib/process-cwd' );
var exists = require( '@stdlib/fs-exists' ).sync;
var nulls = require( '@stdlib/array-base-nulls' );
var format = require( '@stdlib/string-format' );
var validate = require( './validate.js' );


// VARIABLES //

var MODES = {
	'first': first,
	'some': some,
	'all': all,
	'each': each
};


// FUNCTIONS //

/**
* Synchronously resolves the first path match from a set of paths by walking parent directories.
*
* @private
* @param {Array<string>} paths - paths to resolve
* @param {string} dir - base directory
* @returns {Array<string>} resolved paths
*/
function first( paths, dir ) {
	var child;
	var spath;
	var out;
	var i;

	// Start at a base directory and continue moving up through each parent directory...
	out = [];
	while ( child !== dir ) {
		for ( i = 0; i < paths.length; i++ ) {
			spath = resolve( dir, paths[ i ] );
			if ( exists( spath ) ) {
				out.push( spath );
				return out;
			}
		}
		child = dir;
		dir = resolve( dir, '..' );
	}
	return out;
}

/**
* Synchronously resolves one or more paths from a set of paths at a directory level by walking parent directories.
*
* @private
* @param {Array<string>} paths - paths to resolve
* @param {string} dir - base directory
* @returns {Array<string>} resolved paths
*/
function some( paths, dir ) {
	var child;
	var spath;
	var out;
	var i;

	// Start at a base directory and continue moving up through each parent directory...
	out = [];
	while ( child !== dir ) {
		for ( i = 0; i < paths.length; i++ ) {
			spath = resolve( dir, paths[ i ] );
			if ( exists( spath ) ) {
				out.push( spath );
			}
		}
		if ( out.length > 0 ) {
			return out;
		}
		child = dir;
		dir = resolve( dir, '..' );
	}
	return out;
}

/**
* Synchronously resolves all paths from a set of paths at a directory level by walking parent directories.
*
* @private
* @param {Array<string>} paths - paths to resolve
* @param {string} dir - base directory
* @returns {Array<string>} resolved paths
*/
function all( paths, dir ) {
	var child;
	var spath;
	var out;
	var i;

	// Start at a base directory and continue moving up through each parent directory...
	out = [];
	while ( child !== dir ) {
		for ( i = 0; i < paths.length; i++ ) {
			spath = resolve( dir, paths[ i ] );
			if ( exists( spath ) ) {
				out.push( spath );
			}
		}
		if ( out.length === paths.length ) {
			return out;
		}
		out = [];
		child = dir;
		dir = resolve( dir, '..' );
	}
	return out;
}

/**
* Synchronously resolves each path from a set of paths by walking parent directories.
*
* @private
* @param {Array<string>} paths - paths to resolve
* @param {string} dir - base directory
* @returns {Array<string|null>} resolved paths
*/
function each( paths, dir ) {
	var count;
	var child;
	var spath;
	var out;
	var i;

	count = 0;
	out = nulls( paths.length );

	// Start at a base directory and continue moving up through each parent directory...
	while ( child !== dir ) {
		for ( i = 0; i < paths.length; i++ ) {
			if ( out[ i ] !== null ) {
				continue;
			}
			spath = resolve( dir, paths[ i ] );
			if ( exists( spath ) ) {
				out[ i ] = spath;
				count += 1;
			}
		}
		if ( count === paths.length ) {
			break;
		}
		child = dir;
		dir = resolve( dir, '..' );
	}
	return out;
}


// MAIN //

/**
* Synchronously resolves paths from a set of paths by walking parent directories.
*
* @param {Array<string>} paths - paths to resolve
* @param {Options} [options] - function options
* @param {string} [options.dir] - base directory
* @param {string} [options.mode='all'] - mode of operation
* @throws {TypeError} first argument must be an array of strings
* @throws {TypeError} options argument must be an object
* @throws {TypeError} must provide valid options
* @returns {Array<string|null>} resolved paths
*
* @example
* var paths = resolveParentPaths( [ 'package.json', 'package-lock.json' ] );
*/
function resolveParentPaths( paths, options ) {
	var opts;
	var mode;
	var dir;
	var fcn;
	var err;

	if ( !isStringArray( paths ) ) {
		if ( isArrayLikeObject( paths ) && paths.length === 0 ) {
			return [];
		}
		throw new TypeError( format( 'invalid argument. First argument must be an array of strings. Value: `%s`.', paths ) );
	}
	opts = {};
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( opts.dir ) {
		dir = resolve( cwd(), opts.dir );
	} else {
		dir = cwd();
	}
	mode = opts.mode || 'all';

	fcn = MODES[ mode ];
	return fcn( paths, dir );
}


// EXPORTS //

module.exports = resolveParentPaths;
