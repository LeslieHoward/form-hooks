export function unsubscribe(subscriber) {
  return subscriber && subscriber.unsubscribe && subscriber.unsubscribe();
}
