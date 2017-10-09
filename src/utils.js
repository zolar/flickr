/**
 * @method actionName
 * Generates an action type constant given a domain and action name, will automatically uppercase the input
 * to conform to Flux Standard Actions
 * @param domain
 * @param name
 * @returns {String}
 */

export const actionName = (domain, name) => (
  `${domain.toUpperCase()}_${name.toUpperCase()}`
);

/**
 * @method asyncMessageFactory
 * Creates a message factory bound to a particular domain. The factory will accept an action type and generate
 * an object containing `begin` and `end` actions to be used for asynchronous flows.
 * @param domain
 * @returns {Function} a factory function which will return an object containing begin/end string properties
 */

export const asyncMessageFactory = domain => (
  messagePrefix => (
    {
      begin   : actionName(domain, `${messagePrefix}_BEGIN`),
      error   : actionName(domain, `${messagePrefix}_ERROR`),
      success : actionName(domain, `${messagePrefix}_SUCCESS`),
    }
  )
);
