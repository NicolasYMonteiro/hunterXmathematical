import React from 'react';
import RelatedGraph from '../../../components/graph-related/relatedGraph';

const firstDegree = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Explorando Funções do Primeiro Grau</h1>
            <RelatedGraph />
        </div>
    );
}

export default firstDegree;