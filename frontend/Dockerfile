# -------- STAGE 1: Build React App --------
    FROM node:23-slim as build

    WORKDIR /app
    
    # Copy only package.json and package-lock.json first to leverage Docker cache
    COPY package*.json ./
    
    # Install dependencies
    RUN npm install
    
    # Copy the rest of the source code
    COPY . .
    
    # Build the React app
    RUN npm run build
    
    # -------- STAGE 2: Serve with minimal image --------
    FROM node:23-slim
    
    # Install 'serve' to run the production build
    RUN npm install -g serve
    
    WORKDIR /app
    
    # Copy built React app from previous stage
    COPY --from=build /app/build ./build
    
    # Expose the port the app runs on
    EXPOSE 3000
    
    # Run the app using `serve`
    CMD ["serve", "-s", "build", "-l", "3000"]
    