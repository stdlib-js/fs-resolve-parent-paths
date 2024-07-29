<!--

@license Apache-2.0

Copyright (c) 2024 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# resolveParentPaths

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Resolve paths from a set of paths by walking parent directories.



<section class="usage">

## Usage

```javascript
import resolveParentPaths from 'https://cdn.jsdelivr.net/gh/stdlib-js/fs-resolve-parent-paths@v0.1.0-esm/index.mjs';
```

You can also import the following named exports from the package:

```javascript
import { sync } from 'https://cdn.jsdelivr.net/gh/stdlib-js/fs-resolve-parent-paths@v0.1.0-esm/index.mjs';
```

<a name="resolve-parent-paths"></a>

#### resolveParentPaths( paths\[, options], clbk )

Asynchronously resolves paths from a set of paths by walking parent directories.

```javascript
resolveParentPaths( [ 'package.json', 'package-lock.json' ], onPaths );

function onPaths( error, paths ) {
    if ( error ) {
        throw error;
    }
    console.log( paths );
    // => '...'
}
```

The function accepts the following `options`:

-   **dir**: base directory from which to begin walking. May be either an absolute path or a path relative to the current working directory.

-   **mode**: mode of operation. The following modes are supported:

    -   `first`: return the first resolved path.
    -   `some`: return one or more paths resolved within the first directory level containing a match.
    -   `all`: return all resolved paths within the first directory level containing matches for all provided paths.
    -   `each`: independently return the first resolved path for each path at any directory level.
    
    Default: `'all'`.

By default, the function begins walking from the current working directory. To specify an alternative directory, set the `dir` option.

```javascript
var opts = {
    'dir': __dirname
};
resolveParentPaths( [ 'package.json' ], opts, onPaths );

function onPaths( error, paths ) {
    if ( error ) {
        throw error;
    }
    console.log( paths );
    // => '...'
}
```

By default, the function requires that a directory contains matches for all provided paths before returning results. To specify an alternative operation mode, set the `mode` option.

```javascript
var opts = {
    'dir': __dirname,
    'mode': 'first'
};
resolveParentPaths( [ 'package.json', 'package-lock.json' ], opts, onPaths );

function onPaths( error, paths ) {
    if ( error ) {
        throw error;
    }
    console.log( paths );
    // => '...'
}
```

#### resolveParentPaths.sync( paths\[, options] )

Synchronously resolves paths from a set of paths by walking parent directories.

```javascript
var paths = resolveParentPaths.sync( [ 'package.json', 'README.md' ] );
// returns [ '...', '...' ]
```

The function accepts the same `options` as [`resolveParentPaths()`](#resolve-parent-paths).

</section>

<!-- /.usage -->

<section class="notes">

## Notes

-   In `some` mode, the return order of asynchronously resolved paths is not guaranteed.
-   This implementation is **not** similar in functionality to core [`path.resolve`][node-core-path-resolve]. The latter performs string manipulation to generate a full path. This implementation walks parent directories to perform a **search**, thereby touching the file system. Accordingly, this implementation resolves _real_ absolute file paths and is intended for use when a target's location in a parent directory is unknown relative to a child directory; e.g., when wanting to find a package root from deep within a package directory. 

</section>

<!-- /.notes -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```html
<!DOCTYPE html>
<html lang="en">
<body>
<script type="module">

import resolveParentPaths from 'https://cdn.jsdelivr.net/gh/stdlib-js/fs-resolve-parent-paths@v0.1.0-esm/index.mjs';

var opts = {
    'dir': __dirname
};

/* Sync */

var out = resolveParentPaths.sync( [ 'package.json', 'README.md' ], opts );
// returns [ '...', '...' ]

out = resolveParentPaths.sync( [ 'non_existent_basename' ], opts );
// returns []

opts.mode = 'first';
out = resolveParentPaths.sync( [ 'non_existent_basename', 'package.json' ], opts );
// returns [ '...' ]

/* Async */

resolveParentPaths( [ 'package.json', 'README.md' ], opts, onPaths );
resolveParentPaths( [ './../non_existent_path' ], onPaths );

function onPaths( error, paths ) {
    if ( error ) {
        throw error;
    }
    console.log( paths );
}

</script>
</body>
</html>
```

</section>

<!-- /.examples -->



<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2024. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/fs-resolve-parent-paths.svg
[npm-url]: https://npmjs.org/package/@stdlib/fs-resolve-parent-paths

[test-image]: https://github.com/stdlib-js/fs-resolve-parent-paths/actions/workflows/test.yml/badge.svg?branch=v0.1.0
[test-url]: https://github.com/stdlib-js/fs-resolve-parent-paths/actions/workflows/test.yml?query=branch:v0.1.0

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/fs-resolve-parent-paths/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/fs-resolve-parent-paths?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/fs-resolve-parent-paths.svg
[dependencies-url]: https://david-dm.org/stdlib-js/fs-resolve-parent-paths/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://app.gitter.im/#/room/#stdlib-js_stdlib:gitter.im

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[cli-section]: https://github.com/stdlib-js/fs-resolve-parent-paths#cli
[cli-url]: https://github.com/stdlib-js/fs-resolve-parent-paths/tree/cli
[@stdlib/fs-resolve-parent-paths]: https://github.com/stdlib-js/fs-resolve-parent-paths/tree/main

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/fs-resolve-parent-paths/tree/deno
[deno-readme]: https://github.com/stdlib-js/fs-resolve-parent-paths/blob/deno/README.md
[umd-url]: https://github.com/stdlib-js/fs-resolve-parent-paths/tree/umd
[umd-readme]: https://github.com/stdlib-js/fs-resolve-parent-paths/blob/umd/README.md
[esm-url]: https://github.com/stdlib-js/fs-resolve-parent-paths/tree/esm
[esm-readme]: https://github.com/stdlib-js/fs-resolve-parent-paths/blob/esm/README.md
[branches-url]: https://github.com/stdlib-js/fs-resolve-parent-paths/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/fs-resolve-parent-paths/main/LICENSE

[node-core-path-resolve]: https://nodejs.org/api/path.html#path_path_resolve_paths

<!-- <related-links> -->

<!-- </related-links> -->

</section>

<!-- /.links -->
