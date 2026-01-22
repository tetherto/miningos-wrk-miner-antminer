# Mock Server Documentation

This document gives a quickstart for running the mock server

## Running the mock server

The mock server can be run using the following command:

```bash
node mock/server.js --type S19xp_h -p 8080 -h 0.0.0.0
```

The `-p, --port` argument is optional and defaults to `8000`

The `-h, --host` argument is optional and defaults to `127.0.0.1`

The `--error` flag can be used to make the mock server send errored data

The `--type` argument is required. The following types are supported:
- [x] S19xp_h
- [x] S19xp
- [x] S21
- [x] S21pro
