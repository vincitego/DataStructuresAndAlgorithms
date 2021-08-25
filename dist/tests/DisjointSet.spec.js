import { ok } from 'assert';
import { DisjointSet } from '../index.js';
describe('Test Disjoint Set', () => {
    it('New disjoint set should be initialized correctly', () => {
        const ds = new DisjointSet();
        ok(ds.size() === 0);
        ok(ds.componentCount() === 0);
    });
    it('Adding to disjoint set should work correctly', () => {
        const ds = new DisjointSet();
        for (let i = 0; i < 10; i++) {
            ds.add(i);
            ok(ds.peek(i) === i);
        }
        let i = 0;
        for (const value of ds) {
            ok(value === i);
            i++;
        }
        ok(ds.size() === 10);
        ok(ds.componentCount() === 10);
        ok(ds.componentSize(0) === 1);
        ok(ds.getRoot(5) === 5);
        ok(ds.findIndex(9) === 9);
    });
    it('Disjoint set should union correctly', () => {
        const ds = new DisjointSet();
        for (let i = 0; i < 12; i++) {
            ds.add(i);
        }
        ok(ds.union(4, 9));
        ok(ds.componentCount() === 11);
        ok(ds.componentSize(4) === 2);
        ok(ds.componentSize(9) === 2);
        ok(ds.union(1, 0));
        ok(ds.componentCount() === 10);
        ok(ds.componentSize(1) === 2);
        ok(ds.union(5, 6));
        ok(ds.componentCount() === 9);
        ok(ds.componentSize(5) === 2);
        ok(ds.union(5, 10));
        ok(ds.componentCount() === 8);
        ok(ds.componentSize(5) === 3);
        ok(ds.union(4, 3));
        ok(ds.componentCount() === 7);
        ok(ds.componentSize(4) === 3);
        ok(ds.union(3, 2));
        ok(ds.componentCount() === 6);
        ok(ds.componentSize(3) === 4);
        ok(ds.union(7, 1));
        ok(ds.componentCount() === 5);
        ok(ds.componentSize(7) === 3);
        ok(ds.union(4, 5));
        ok(ds.componentCount() === 4);
        ok(ds.componentSize(4) === 7);
        ok(ds.componentSize(5) === 7);
        ok(!ds.union(5, 10));
        ok(ds.componentCount() === 4);
        ok(ds.componentSize(10) === 7);
        ok(ds.union(11, 8));
        ok(ds.componentCount() === 3);
        ok(ds.componentSize(11) === 2);
        ok(ds.union(11, 1));
        ok(ds.componentCount() === 2);
        ok(ds.componentSize(11) === 5);
        ok(ds.componentSize(1) === 5);
        ok(ds.union(11, 10));
        ok(ds.componentCount() === 1);
        ok(ds.componentSize(11) === 12);
        ok(ds.componentSize(10) === 12);
        ds.add(99);
        ok(ds.componentCount() === 2);
        ok(ds.componentSize(12) === 1);
        ok(ds.findIndex(99) === 12);
        ok(ds.union(12, 0));
        ok(ds.componentCount() === 1);
        ok(ds.componentSize(12) === 13);
    });
    it('Should be able to use disjoint set with objects', () => {
        const ds = new DisjointSet();
        for (let i = 0; i < 10; i++) {
            ds.add({ foo: i });
            ok(ds.peek(i).foo === i);
        }
        let i = 0;
        for (const value of ds) {
            ok(value.foo === i);
            i++;
        }
        ok(ds.size() === 10);
        ok(ds.componentCount() === 10);
        ok(ds.componentSize(0) === 1);
        ok(ds.getRoot(5) === 5);
        ok(ds.findIndex(node => node.foo === 9) === 9);
        ok(ds.findIndex(node => node.foo === 5) === 5);
        ok(ds.union(9, 5));
        ok(ds.componentCount() === 9);
        ok(ds.componentSize(9) === 2);
    });
    it('Invalid indexes should error', () => {
        const ds = new DisjointSet();
        for (let i = 0; i < 10; i++) {
            ds.add(i);
        }
        try {
            ds.union(-1, 0);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            ds.union(0, -1);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            ds.union(100, 0);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            ds.union(0, 100);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            ds.union(0, 0);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            ds.union('a', 0);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            ds.union(0, 'a');
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            ds.peek('a');
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            ds.peek(-1);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            ds.peek(100);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            ds.findIndex(100);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            ds.componentSize(-1);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            ds.componentSize(100);
            ok(false);
        }
        catch (error) {
            ok(true);
        }
        try {
            ds.componentSize('a');
            ok(false);
        }
        catch (error) {
            ok(true);
        }
    });
});
