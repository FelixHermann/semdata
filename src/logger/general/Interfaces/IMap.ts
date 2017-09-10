export interface IMap<K,V> {
    set(key: K, value: V);
    get(key: K): V;
    delete(key: K);
    keys();
}
