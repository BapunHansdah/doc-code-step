
const Data= [{
                 'step':0,
                 'title':'title',
                 'description':'some random short description with length 200 words',
                 'data':{   
    	                 'id':0,
                         'parent_id':null,
    	                 'name':'root',
    	                 'isFolder':true, 
    	                 'code':null,
                         'path':'root',
    	                 'contains':[
    	                      {
    	                      	'id':2,
                                'parent_id':0,
    	                      	'name':'index.js',
    	                      	'isFolder':false,
    	                      	'contains':[],
                                'path':'root/index.js',
    	                      	'code':'index.js 2'
    	                      },
    	                      {
    	                      	'id':3,
                                'parent_id':0,
    	                      	'name':'main.js',
    	                      	'isFolder':false,
    	                      	'contains':[],
                                'path':'root/main.js',
    	                      	'code':'main.js 3'
    	                      },
    	                      {
    	                      	'id':4,
                                'parent_id':0,
    	                      	'name':'folder',
    	                      	'isFolder':true,
                                'path':'root/folder',
    	                      	'code':null,
    	                        'contains':[
    	                           {
    	                           	'id':5,
                                    'parent_id':4,
    	                           	'name':'cat.js',
    	                      	    'isFolder':false,
                                    'path':'root/folder/cat.js',
    	                      	    'contains':[],
    	                      	    'code':'cat.js 5' 	
    	                           },
    	                           {
    	                           	'id':6,
                                    'parent_id':4,
    	                           	'name':'dog.js',
    	                      	    'isFolder':false,
                                    'path':'root/folder/dog.js',
    	                      	    'contains':[],
    	                      	    'code':'dog.js 6'
    	                           }
    	                        ]
    	                       }
    	                    ]
    	              }
             }
             ]


export {Data}