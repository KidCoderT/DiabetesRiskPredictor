import uvicorn
import sys

if __name__ == "__main__":
    should_reload = sys.argv[-1].lower() == "true"
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=should_reload)
