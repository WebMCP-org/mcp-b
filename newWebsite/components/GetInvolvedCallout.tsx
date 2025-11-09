export function GetInvolvedCallout() {
  return (
    <section className="not-prose bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-4 sm:p-8 my-6 sm:my-8 border border-purple-200 dark:border-purple-800">
      <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Get Involved</h3>
      <div className="space-y-3 sm:space-y-4">
        <div>
          <p className="font-semibold mb-2 text-sm sm:text-base">Website owners:</p>
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            Try adding MCP to your site. Takes 5 minutes. Download the extension, add the server to your page, and register it with a TabServerTransport.
          </p>
        </div>
        <div>
          <p className="font-semibold mb-2 text-sm sm:text-base">Extension developers:</p>
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            Build on top of MCP-B. If you already have an MCP client in your extension, your job is really easy. If not, you can see how I did it with assistant UI.
          </p>
        </div>
      </div>
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-purple-200 dark:border-purple-800">
        <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm sm:text-base">
          Want to test it out on your website? Reach out:
        </p>
        <a
          href="mailto:alexnahasdev@gmail.com"
          className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline font-semibold break-words"
        >
          alexnahasdev@gmail.com →
        </a>
      </div>
    </section>
  )
}
