FROM node
SHELL ["mkdir", "-p", "/app"]
COPY . /app
WORKDIR /app
RUN ["npm", "install"]
RUN ["npm", "run", "typescript-compile"]
RUN ["npm", "run", "build"]
EXPOSE 80/tcp
CMD ["npm", "start"]
