
import filecmp
import os
import unittest
import sys
sys.path.insert(0, "../src")

import pytools  # NOQA

class TestTemplates(unittest.TestCase):

    def setUp(self):
        pass

    def test_create_str(self):
        with open("utf8_test.template") as filename:
            content = filename.read()
        self.assertEqual(pytools.create("utf8_test.py"), content)

    def test_create_file(self):
        pytools.create("utf8_test.py", "junk")
        self.assertTrue(filecmp.cmp("utf8_test.template", "junk", shallow=False))  # NOQA
        os.remove("junk")

if __name__ == '__main__':
    unittest.main()
