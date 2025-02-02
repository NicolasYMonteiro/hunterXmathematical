import React from 'react';
import QuadraticGraph from '@/components/graph-quadratic/quadraticGraph';

const firstDegree = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Explorando Funções Quadráticas</h1>
            <QuadraticGraph />
        </div>
    );
}

export default firstDegree;