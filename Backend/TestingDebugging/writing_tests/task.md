Any material is better retained after a little practice.

### Task
You are given a new `/concat` route in the file `backend/src/index.js` and
the corresponding test file `backend/__tests__/concat.test.js`, which contains tests for this route.

Currently, `concat.test.js` intentionally contains incorrect expressions, causing the tests to fail.
Similar to `sum.test.js`, you need to implement three tests for the `/concat` route:

1. Check that the two strings are correctly concatenated.
2. Verify that concatenation, not addition, occurs when the two strings consist of digits. 
   - For example, for a query `/concat?str1=123&str2=456`, the answer should be `"result": "123456"`.
3. Check the error handling when one or both arguments are missing.

Remember to check the return code as well, not just the result.

You can also play with the `/concat` route using the frontend.
