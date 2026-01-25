---
id: 001
title: Fix SQLAlchemy Python 3.13 Compatibility
stage: misc
date: 2026-01-13
surface: agent
model: gemini
feature: pythonic-attributes
branch: 002-pythonic-attributes
user: zohair
command: fix error
labels: ["bugfix", "python3.13", "sqlalchemy"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - todo-hackathon3/pyproject.toml
 - todo-hackathon3/requirements.txt
tests:
 - manual import check
---

## Prompt

hey gemini can you fix this error:
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [2303] using WatchFiles
Process SpawnProcess-1:
Traceback (most recent call last):
  File "/home/zohair/.local/share/uv/python/cpython-3.13.11-linux-x86_64-gnu/lib/python3.13/multiprocessing/process.py", line 313, in _bootstrap
    self.run()
    ~~~~~~~~^^
  File "/home/zohair/.local/share/uv/python/cpython-3.13.11-linux-x86_64-gnu/lib/python3.13/multiprocessing/process.py", line 108, in run
    self._target(*self._args, **self._kwargs)
    ~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/mnt/c/Users/zohai/Desktop/IT Course/AI/spec-kit/Hackathon3(ii)/phase3.2/todo-hackathon3/.venv/lib/python3.13/site-packages/uvicorn/_subprocess.py", line 80, in subprocess_started
    target(sockets=sockets)
    ~~~~~~^^^^^^^^^^^^^^^^^
  File "/mnt/c/Users/zohai/Desktop/IT Course/AI/spec-kit/Hackathon3(ii)/phase3.2/todo-hackathon3/.venv/lib/python3.13/site-packages/uvicorn/server.py", line 67, in run   
    return asyncio_run(self.serve(sockets=sockets), loop_factory=self.config.get_loop_factory())
  File "/home/zohair/.local/share/uv/python/cpython-3.13.11-linux-x86_64-gnu/lib/python3.13/asyncio/runners.py", line 195, in run
    return runner.run(main)
           ~~~~~~~~~~^^^^^^
  File "/home/zohair/.local/share/uv/python/cpython-3.13.11-linux-x86_64-gnu/lib/python3.13/asyncio/runners.py", line 118, in run
    return self._loop.run_until_complete(task)
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^^
  File "uvloop/loop.pyx", line 1518, in uvloop.loop.Loop.run_until_complete
  File "/mnt/c/Users/zohai/Desktop/IT Course/AI/spec-kit/Hackathon3(ii)/phase3.2/todo-hackathon3/.venv/lib/python3.13/site-packages/uvicorn/server.py", line 71, in serve 
    await self._serve(sockets)
  File "/mnt/c/Users/zohai/Desktop/IT Course/AI/spec-kit/Hackathon3(ii)/phase3.2/todo-hackathon3/.venv/lib/python3.13/site-packages/uvicorn/server.py", line 78, in _serve
    config.load()
    ~~~~~~~~~~~^^
  File "/mnt/c/Users/zohai/Desktop/IT Course/AI/spec-kit/Hackathon3(ii)/phase3.2/todo-hackathon3/.venv/lib/python3.13/site-packages/uvicorn/config.py", line 439, in load 
    self.loaded_app = import_from_string(self.app)
                      ~~~~~~~~~~~~~~~~~~^^^^^^^^^^
  File "/mnt/c/Users/zohai/Desktop/IT Course/AI/spec-kit/Hackathon3(ii)/phase3.2/todo-hackathon3/.venv/lib/python3.13/site-packages/uvicorn/importer.py", line 19, in import_from_string
    module = importlib.import_module(module_str)
  File "/home/zohair/.local/share/uv/python/cpython-3.13.11-linux-x86_64-gnu/lib/python3.13/importlib/__init__.py", line 88, in import_module
    return _bootstrap._gcd_import(name[level:], package, level)
           ~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "<frozen importlib._bootstrap>", line 1387, in _gcd_import
  File "<frozen importlib._bootstrap>", line 1360, in _find_and_load
  File "<frozen importlib._bootstrap>", line 1331, in _find_and_load_unlocked
  File "<frozen importlib._bootstrap>", line 935, in _load_unlocked
  File "<frozen importlib._bootstrap_external>", line 1023, in exec_module
  File "<frozen importlib._bootstrap>", line 488, in _call_with_frames_removed
  File "/mnt/c/Users/zohai/Desktop/IT Course/AI/spec-kit/Hackathon3(ii)/phase3.2/todo-hackathon3/app/main.py", line 7, in <module>
    from sqlmodel import SQLModel
  File "/mnt/c/Users/zohai/Desktop/IT Course/AI/spec-kit/Hackathon3(ii)/phase3.2/todo-hackathon3/.venv/lib/python3.13/site-packages/sqlmodel/__init__.py", line 4, in <module>
    from sqlalchemy.engine import create_engine as create_engine
  File "/mnt/c/Users/zohai/Desktop/IT Course/AI/spec-kit/Hackathon3(ii)/phase3.2/todo-hackathon3/.venv/lib/python3.13/site-packages/sqlalchemy/__init__.py", line 13, in <module>
    from .engine import AdaptedConnection as AdaptedConnection
  File "/mnt/c/Users/zohai/Desktop/IT Course/AI/spec-kit/Hackathon3(ii)/phase3.2/todo-hackathon3/.venv/lib/python3.13/site-packages/sqlalchemy/engine/__init__.py", line 18, in <module>
    from . import events as events
  File "/mnt/c/Users/zohai/Desktop/IT Course/AI/spec-kit/Hackathon3(ii)/phase3.2/todo-hackathon3/.venv/lib/python3.13/site-packages/sqlalchemy/engine/events.py", line 19, in <module>
    from .base import Connection
  File "/mnt/c/Users/zohai/Desktop/IT Course/AI/spec-kit/Hackathon3(ii)/phase3.2/todo-hackathon3/.venv/lib/python3.13/site-packages/sqlalchemy/engine/base.py", line 30, in <module>
    from .interfaces import BindTyping
  File "/mnt/c/Users/zohai/Desktop/IT Course/AI/spec-kit/Hackathon3(ii)/phase3.2/todo-hackathon3/.venv/lib/python3.13/site-packages/sqlalchemy/engine/interfaces.py", line 38, in <module>
    from ..sql.compiler import Compiled as Compiled
  File "/mnt/c/Users/zohai/Desktop/IT Course/AI/spec-kit/Hackathon3(ii)/phase3.2/todo-hackathon3/.venv/lib/python3.13/site-packages/sqlalchemy/sql/__init__.py", line 14, in <module>
    from .compiler import COLLECT_CARTESIAN_PRODUCTS as COLLECT_CARTESIAN_PRODUCTS
  File "/mnt/c/Users/zohai/Desktop/IT Course/AI/spec-kit/Hackathon3(ii)/phase3.2/todo-hackathon3/.venv/lib/python3.13/site-packages/sqlalchemy/sql/compiler.py", line 61, in <module>
    from . import crud
  File "/mnt/c/Users/zohai/Desktop/IT Course/AI/spec-kit/Hackathon3(ii)/phase3.2/todo-hackathon3/.venv/lib/python3.13/site-packages/sqlalchemy/sql/crud.py", line 34, in <module>
    from . import dml
  File "/mnt/c/Users/zohai/Desktop/IT Course/AI/spec-kit/Hackathon3(ii)/phase3.2/todo-hackathon3/.venv/lib/python3.13/site-packages/sqlalchemy/sql/dml.py", line 34, in <module>
    from . import util as sql_util
  File "/mnt/c/Users/zohai/Desktop/IT Course/AI/spec-kit/Hackathon3(ii)/phase3.2/todo-hackathon3/.venv/lib/python3.13/site-packages/sqlalchemy/sql/util.py", line 46, in <module>
    from .ddl import sort_tables as sort_tables  # noqa: F401
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/mnt/c/Users/zohai/Desktop/IT Course/AI/spec-kit/Hackathon3(ii)/phase3.2/todo-hackathon3/.venv/lib/python3.13/site-packages/sqlalchemy/sql/ddl.py", line 30, in <module>
    from .elements import ClauseElement
  File "/mnt/c/Users/zohai/Desktop/IT Course/AI/spec-kit/Hackathon3(ii)/phase3.2/todo-hackathon3/.venv/lib/python3.13/site-packages/sqlalchemy/sql/elements.py", line 810, in <module>
    class SQLCoreOperations(Generic[_T_co], ColumnOperators, TypingOnly):
    ...<472 lines>...
                ...
  File "/home/zohair/.local/share/uv/python/cpython-3.13.11-linux-x86_64-gnu/lib/python3.13/typing.py", line 1269, in _generic_init_subclass
    super(Generic, cls).__init_subclass__(*args, **kwargs)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^
  File "/mnt/c/Users/zohai/Desktop/IT Course/AI/spec-kit/Hackathon3(ii)/phase3.2/todo-hackathon3/.venv/lib/python3.13/site-packages/sqlalchemy/util/langhelpers.py", line 1988, in __init_subclass__
    raise AssertionError(
    ...<2 lines>...
    )
AssertionError: Class <class 'sqlalchemy.sql.elements.SQLCoreOperations'> directly inherits TypingOnly but has additional attributes {'__firstlineno__', '__static_attributes__'}.

## Response snapshot

Upgraded `sqlalchemy` to `>=2.0.36` in `pyproject.toml` and `requirements.txt` to resolve compatibility issues with Python 3.13. Ran `uv sync` to apply changes. verified with a script.

## Outcome

- ✅ Impact: Resolved startup crash.
- 🧪 Tests: Verified import of sqlmodel/sqlalchemy.
- 📁 Files: Updated pyproject.toml and requirements.txt.
- 🔁 Next prompts: Run the server.
- 🧠 Reflection: Standard dependency upgrade fix.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
