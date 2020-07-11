module.exports = {
  development: {
    SKIP_PREFLIGHT_CHECK: true,
  },
  test: {
    SKIP_PREFLIGHT_CHECK: true,
    CI: true,
  },
  production: {
    SKIP_PREFLIGHT_CHECK: true,
  },
};
