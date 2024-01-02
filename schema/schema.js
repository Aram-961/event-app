// Import necessary modules
const { projects, clients } = require("../sampledata.js"); // Import client and project data
const graphql = require("graphql"); // Import GraphQL library
const Project = require("../models/Project.js");
const Client = require("../models/Client.js");

// Extract commonly used GraphQL types for clarity
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = graphql;

// **Client Schema Definition**
// Define a GraphQL type representing a client
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID }, // Unique identifier for the client
    name: { type: GraphQLString }, // Client's name
    email: { type: GraphQLString }, // Client's email address
    phone: { type: GraphQLString }, // Client's phone number
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },

    // relationship
    client: {
      type: ClientType,
      resolve(parentValue, args) {
        return Client.findById(parentValue.clientId);
      },
    },
  }),
});

// **Root Query Definition**
// Define the root query type, the entry point for GraphQL queries
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // we're retrieving all the clients info
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parentValue, args) {
        return Project.find();
      },
    },

    project: {
      type: ProjectType, // Returns a Client object
      args: { id: { type: GraphQLID } }, // Argument to specify the client to fetch
      resolve(parentValue, args) {
        return Project.findById(args.id);
      },
    },

    clients: {
      type: new GraphQLList(ClientType),
      resolve(parentValue, args) {
        // Resolve function to fetch client data
        return Client.find();
      },
    },
    // Client retrieval field
    client: {
      type: ClientType, // Returns a Client object
      args: { id: { type: GraphQLID } }, // Argument to specify the client to fetch
      resolve(parentValue, args) {
        return Client.findById(parentValue.id);
      },
    },
  },
});

//**MUTATIONS */

// Adding a new client
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return client.save();
      },
    },

    // Delete Client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },

      resolve(parent, args) {
        return Client.findByIdAndDelete(args.id);
      },
    },

    // Add Project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "in progress" },
              completed: { value: "completed" },
            },
          }),

          defaultValue: "Not Started",
        },

        clientId: { type: GraphQLNonNull(GraphQLID) },
      },

      resolve(parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });

        return project.save();
      },
    },
    // Delete Project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },

      resolve(parent, args) {
        return Project.findByIdAndDelete(args.id)
          .then((deletedProject) => {
            console.log("Deleted Project:", deletedProject);
            return deletedProject;
          })
          .catch((error) => {
            console.error("Error deleting project:", error);
            throw error; // Re-throw the error to propagate it to the GraphQL response
          });
      },
    },
  },
});

// **GraphQL Schema Construction**
// Create the GraphQL schema, making the RootQueryType available for queries
module.exports = new GraphQLSchema({
  query: RootQuery, // Specify RootQueryType as the query root
  mutation,
});
