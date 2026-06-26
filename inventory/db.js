const crypto = require('crypto');


let posts =  [
    {
        id: '1',
        title: 'Getting Started  with fastify',
        content: 'Fastify is a very fast Node.js web framework ...',
        tags : [ 'nodejs', 'fastify', 'backend'],
        createdAt: new Date().toISOString()
    }
];

module.exports = {
    getAll: () => {
        return posts;
    },
    getById: (id) => {
        return posts.find(p => p.id === id); 

    },

    add: (title, content, tags) => { 
        const newPost = {
            id: crypto.randomUUID(),
            title,
            content,
            tags: tags || [],
            createdAt: new Date().toString()
        };

        posts.push(newPost);
        return newPost;
    },

    update: (id, title, content, tags) => {
        const postIndex = posts.findIndex(p => p.id === id);
        if ( postIndex === -1) return null;

        posts[ postIndex] = {
            ...posts[postIndex],
            title, 
            content,
            tags: tags || posts[ postIndex].tags
        };
        return posts[postIndex];
      
    },
    delete: (id) => {
        const postIndex = posts.findIndex(p => p.id === id);
        if (postIndex === -1) return false;

        posts.splice(postIndex, 1);
        return true;
    }

};
