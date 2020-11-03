const { createMiddleware } = require('@promster/express')

const prometheusOptions = {
    accuracies: ['ms', 's'],
    metricTypes: [
      'httpRequestsTotal',
      'httpRequestsSummary',
      'httpRequestsHistogram',
      'httpRequestDurationSeconds',
      'httpRequestDurationPerPercentileSeconds',
    ],
  }

const prometheusMiddleware = (app) => createMiddleware({ app, options: prometheusOptions})

module.exports = prometheusMiddleware
